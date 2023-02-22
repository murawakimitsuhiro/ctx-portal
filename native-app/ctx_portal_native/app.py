#!/usr/bin/env python
from browser import BrowserIO

browser_pipe = BrowserIO()
browser_pipe.add_handler('ping', lambda data: ('pong', { 'text': f'hello! {data.get("text")}'}))

while True:
  browser_pipe.handle_message()
