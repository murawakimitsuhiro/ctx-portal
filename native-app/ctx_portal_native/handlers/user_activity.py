from pkg.supabase import SupabaseClient
from pkg.ocr import image_to_paragraphs
import os

def handle_user_activity(data):
    ocr_paragraphs = image_to_paragraphs(data.get('img'))
    sb_client = SupabaseClient()
    save_data = sb_client.insert_browse_paragraph_log(data, ocr_paragraphs)
    return ('user-activity', {'saved': save_data})
