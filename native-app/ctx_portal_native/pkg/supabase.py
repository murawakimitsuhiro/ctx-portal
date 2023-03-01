import base64
from functools import reduce
import json
import os
from uuid import uuid4
from typing import List
from value_object.browse_history import BrowseHistory
from value_object.browse_paragraph_log import Document, Paragraph, BrowseParagraphLog
from supabase import create_client, Client, PostgrestAPIResponse

class SupabaseClient:
    def __init__(self) -> None:
        url: str = os.environ.get("SUPABASE_CTX_C_URL")
        key: str = os.environ.get("SUPABASE_CTX_C_KEY")
        self.client: Client = create_client(url, key)

    def select_countries(self):
        response = self.client.table("countries").select("*").execute()
        data_json = json.loads(response.json())
        data_entries = data_json['data']
        return data_entries

    def select_document(self, url):
        resposne = self.client.table("documents").select("*").eq("url", url).execute()
        return json.loads(resposne.json())['data']

    def select_paragraphs(self, document_id):
        resposne = self.client.table("paragraphs").select("*").eq("document_id", document_id).execute()
        return json.loads(resposne.json())['data']

    def storage(self):
        return self.client.storage()

    def upload_document_capture(self, document_id, imgb64):
        im_bytes = base64.b64decode(imgb64.split(',')[-1])

        file_name = 'browse_log/' + document_id + '.jpg'
        res = self.storage().from_('capture-image').remove(file_name)
        res = self.storage().from_('capture-image').upload(file_name, im_bytes)

        pub_url = self.storage().from_('capture-image').get_public_url(file_name)
        return pub_url

    def insert_browse_paragraph_log(self, browseLog, texts):
        exist_doc = self.select_document(browseLog.get('document').get('url'))
        document = next(iter(exist_doc), None)

        # saved_paragraphs = self.select_paragraphs(document['id']) if document else []
        # return reduce(lambda acc, p: acc+p['text'], saved_paragraphs, '')


        if document is None:
            doc_id = str(uuid4())
            img_url = self.upload_document_capture(doc_id, browseLog.get('img'))
            document: Document = {
                'id': doc_id,
                'title': browseLog.get('document').get('title'),
                'url': browseLog.get('document').get('url'),
                'latest_capture_image_url': img_url,
            }
            data, count = self.client.table("documents").insert(document).execute()
        else:
            img_url = self.upload_document_capture(document['id'], browseLog.get('img'))
            document['latest_capture_image_url'] = img_url
            data, count = self.client.table("documents").update(document).eq('id', document['id']).execute()

        paragraphs: List(Paragraph) = [
            {
                'id': str(uuid4()),
                'document_id': document['id'],
                'text': p_text
            }
            for p_text in texts
        ]

        browse_paragraph_log: BrowseParagraphLog = {
            'timestamp': browseLog.get('timestamp'),
            'document_id': document['id'],
            'paragraph_ids': [p['id'] for p in paragraphs],
            # 'capture_img': browseLog.get('img')
        }

        histories: List(BrowseHistory) = [
            {
                'id': h.get('id'),
                'last_visit_time': h.get('lastVisitTime'),
                'title': h.get('title'),
                'url': h.get('url'),
            }
            for h in browseLog.get('histories')
        ]

        data, count = self.client.table("paragraphs").insert(paragraphs).execute()
        data, count = self.client.table("browse_paragraph_logs").insert(browse_paragraph_log).execute()
        data, count = self.client.table("histories").insert(histories).execute()

        return data
