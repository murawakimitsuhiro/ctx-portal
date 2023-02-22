#!/usr/bin/env python
from browser import BrowserIO

def handle_ping(data):
  return ('pong', { 'text': f'hello! {data.get("text")}'}) 

browser_pipe = BrowserIO()
browser_pipe.add_handler('ping', handle_ping)

while True:
  browser_pipe.handle_message()
