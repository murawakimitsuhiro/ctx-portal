import json
import os
from uuid import uuid4
from typing import List
from pkg.value_object.browse_paragraph_log import Document, Paragraph, BrowseParagraphLog
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

    def insert_browse_paragraph_log(self, browseLog, texts):
        document: Document = {
            'id': str(uuid4()),
            'title': browseLog.get('document').get('title'),
            'url': browseLog.get('document').get('url'),
        }

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
            'capture_img': browseLog.get('img')
        }

        return {'log': browse_paragraph_log, 'document': document, 'paragraphs': paragraphs}
