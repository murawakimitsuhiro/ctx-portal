import base64
from io import BytesIO
import json
import os
import sys
import datetime
from os.path import dirname, abspath
from pprint import pprint

parent_dir = dirname(dirname(abspath(__file__)))
sys.path.append(parent_dir)

from pkg.supabase import SupabaseClient
from pkg.ocr import image_to_paragraphs
from pkg.util.dummy_data import dummy_document_b64img

def handle_user_activity(data):
    ocr_paragraphs = image_to_paragraphs(data.get('img'))
    sb_client = SupabaseClient()
    save_data = sb_client.insert_browse_paragraph_log(data, ocr_paragraphs)
    return ('user-activity', {'saved': save_data})


if __name__ == '__main__':
    from pkg.util.dummy_data import dummy_browse_log

    sb_client = SupabaseClient()

    # databaseに突っ込んでいたものを削除
    # for d in documents:
    #     # imgb64 = dummy_document_b64img()
    #     print(d['title'])

    #     imgb64 = d['latest_capture_img']
    #     im_bytes = base64.b64decode(imgb64.split(',')[-1])

    #     file_name = 'browse_log/' + d['id'] + '.jpg'
    #     res = storage.from_('capture-image').remove(file_name)
    #     res = storage.from_('capture-image').upload(file_name, im_bytes)

    #     print('upload image result: ')
    #     print(res)
    #     pub_url = storage.from_('capture-image').get_public_url(file_name)
    #     print(pub_url)

    #     d['latest_capture_img'] = None
    #     d['latest_capture_image_url'] = pub_url
    #     data, count = sb_client.client.table("documents").update(d).eq('id', d['id']).execute()
