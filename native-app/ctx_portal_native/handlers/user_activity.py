from pkg.supabase import SupabaseClient
from pkg.ocr import image_to_paragraphs
import os

def handle_user_activity(data):
    # ocr_paragraphs = image_to_paragraphs(data.get('img'))
    # return ('user-activity', {'paragraphs': ocr_paragraphs})
    sb_client = SupabaseClient()
    countries = sb_client.select_countries()
    return ('user-activity', {'paragraphs': countries})
