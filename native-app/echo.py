#!/usr/bin/env python

import sys
import json
import struct
import os

# Python 3.x version
# Read a message from stdin and decode it.
def getMessage():
    rawLength = sys.stdin.buffer.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = struct.unpack('@I', rawLength)[0]
    message = sys.stdin.buffer.read(messageLength).decode('utf-8')
    return json.loads(message)

# WriteMessage(b'{"stopped": true }')
def writeMessage(message):
  try:
    sys.stdout.buffer.write(struct.pack("I", len(message)))
    sys.stdout.buffer.write(message)
    sys.stdout.buffer.flush()
    return True
  except IOError:
    return False

def writeObjectMessage(obj):
  writeMessage(json.dumps(obj).encode('utf-8'))


while True:
    receivedMessage = getMessage()
    msg = {
        'text': 'pong',
        'echo': receivedMessage.get('text'),
    }
    writeObjectMessage(msg)