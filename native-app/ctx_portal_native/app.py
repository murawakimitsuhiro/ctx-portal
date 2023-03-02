#!/usr/bin/env python
from browser import BrowserIO
from dependency import AppDependencies
from handlers.user_activity import handle_user_activity
from handlers.search import SearchHandler

app_dependencies = AppDependencies()
search_handler = SearchHandler(app_dependencies.usecases)

browser_pipe = BrowserIO()
browser_pipe.add_handler('ping', lambda data: ('pong', { 'text': f'hello! {data.get("text")}'}))

browser_pipe.add_handler('user-activity', handle_user_activity)
browser_pipe.add_handler('search-context', search_handler.handle_context_search)
# browser_pipe.add_handler('browser-history-log', handle_user_activity)

while True:
  browser_pipe.handle_message()
