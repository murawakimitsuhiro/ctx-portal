import os
import sys
from os.path import dirname, abspath
from pprint import pprint

parent_dir = dirname(dirname(abspath(__file__)))
sys.path.append(parent_dir)

from pkg.supabase import SupabaseClient
from pkg.ocr import image_to_paragraphs

def handle_user_activity(data):
    ocr_paragraphs = image_to_paragraphs(data.get('img'))
    sb_client = SupabaseClient()
    save_data = sb_client.insert_browse_paragraph_log(data, ocr_paragraphs)
    return ('user-activity', {'saved': save_data})


if __name__ == '__main__':
    from pkg.util.dummy_data import dummy_browse_log

    data = dummy_browse_log()
    pprint(handle_user_activity(data))
