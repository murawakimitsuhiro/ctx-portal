import sys
import json
import struct

class BrowserIO:
  def __init__(self):
    self.handlers = {}

  def getMessage(self):
      rawLength = sys.stdin.buffer.read(4)
      if len(rawLength) == 0:
          sys.exit(0)
      messageLength = struct.unpack('@I', rawLength)[0]
      message = sys.stdin.buffer.read(messageLength).decode('utf-8')
      return json.loads(message)

  # WriteMessage(b'{"stopped": true }')
  def writeMessage(self, message):
    try:
      sys.stdout.buffer.write(struct.pack("I", len(message)))
      sys.stdout.buffer.write(message)
      sys.stdout.buffer.flush()
      return True
    except IOError:
      return False

  def writeObjectMessage(self, obj):
    self.writeMessage(json.dumps(obj).encode('utf-8'))
  
  def writeException(self, message):
    self.writeObjectMessage({'type': 'exception', 'data': message})

  def add_handler(self, m_type, handler):
    self.handlers[m_type] = handler

  def handle_message(self):
    received = self.getMessage()

    receive_type = received.get('type')
    if not receive_type:
      self.writeException('no type')
      return

    handler = self.handlers.get(receive_type)
    if not handler:
      self.writeException(f'not defined handler for message type: {receive_type}')
      return

    send_type, data = handler(received.get('data'))
    self.writeObjectMessage({'type': send_type, 'data': data})
