import json
import os
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