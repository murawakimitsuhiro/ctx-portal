import sys
import json
import struct

class BrowserIO:
  def __init__(self):
    self.handlers = {}

  def get_message(self):
      rawLength = sys.stdin.buffer.read(4)
      if len(rawLength) == 0:
          sys.exit(0)
      messageLength = struct.unpack('@I', rawLength)[0]
      message = sys.stdin.buffer.read(messageLength).decode('utf-8')
      return json.loads(message)

  def write_message(self, message):
    try:
      sys.stdout.buffer.write(struct.pack("I", len(message)))
      sys.stdout.buffer.write(message)
      sys.stdout.buffer.flush()
      return True
    except IOError:
      return False

  def write_object_message(self, obj):
    self.write_message(json.dumps(obj).encode('utf-8'))
  
  def write_exception(self, message):
    self.write_object_message({'type': 'exception', 'data': message})

  def add_handler(self, m_type, handler):
    self.handlers[m_type] = handler

  def handle_message(self):
    received = self.get_message()

    receive_type = received.get('type')
    if not receive_type:
      self.write_exception('no type')
      return

    handler = self.handlers.get(receive_type)
    if not handler:
      self.write_exception(f'not defined handler for message type: {receive_type}')
      return

    send_type, data = handler(received.get('data'))
    self.write_object_message({'type': send_type, 'data': data})
