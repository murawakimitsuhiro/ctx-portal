#!/usr/bin/env python
from browser import BrowserIO
from handlers.user_activity import handle_user_activity

browser_pipe = BrowserIO()
browser_pipe.add_handler('ping', lambda data: ('pong', { 'text': f'hello! {data.get("text")}'}))

browser_pipe.add_handler('user-activity', handle_user_activity)

while True:
  browser_pipe.handle_message()
