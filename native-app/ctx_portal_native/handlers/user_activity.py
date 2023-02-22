def handle_user_activity(data):
  return ('user-activity', { 'text': f'received timestamp {data.get("timestamp")}'})