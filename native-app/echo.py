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

# Encode a message for transmission,
# given its content.
def encodeMessage(messageContent):
    encodedContent = json.dumps(messageContent).encode('utf-8')
    encodedLength = struct.pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}

# Send an encoded message to stdout
def sendMessage(encodedMessage):
    sys.stdout.buffer.write(encodedMessage['length'])
    sys.stdout.buffer.write(encodedMessage['content'])
    sys.stdout.buffer.flush()

def WriteMessage(message):
  try:
    sys.stdout.buffer.write(struct.pack("I", len(message)))
    sys.stdout.buffer.write(message)
    sys.stdout.buffer.flush()
    return True
  except IOError:
    return False

while True:
    receivedMessage = getMessage()
    # if receivedMessage['message'] == "ping":
    #   sendMessage(encodeMessage("pong"))

    # rawLength = sys.stdin.buffer.read(4)
    # msg = {
    #     'text': 'pong',
    # }
    WriteMessage(json.dumps('pong').encode('utf-8'))
    

    # sendMessage(encodeMessage(msg))
    # if receivedMessage == "get_temperature":
    #     command = "/usr/local/bin/istats | grep \"CPU temp\" | awk '{print $3}'"
    #     stream = os.popen(command)
    #     sendMessage(encodeMessage(stream.read().strip()))