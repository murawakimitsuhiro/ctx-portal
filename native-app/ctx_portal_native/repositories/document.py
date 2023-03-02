import sys
from os.path import dirname, abspath
from typing import List
from uuid import UUID
from postgrest import SyncPostgrestClient

parent_dir = dirname(dirname(abspath(__file__)))
sys.path.append(parent_dir)

from value_object.searched_document import SearchedDocument

class DocumentRepository:
    def __init__(self, client: SyncPostgrestClient):
        self.table = client.from_('documents')

    def list(self) -> List[SearchedDocument]:
        return self.table.select('*').limit(10).execute()
        
    def get_by_ids(self, ids: List[UUID]) -> List[SearchedDocument]:
        return self.table.select('*').in_('id', ids).execute()


if __name__ == '__main__':
    from pprint import pprint
    client = SyncPostgrestClient('http://localhost:3000')
    repository = DocumentRepository(client)
    ids = ['834b871e-0dc3-4a3e-b1f1-d9a4a7512413', '713db4fb-a0a9-4641-995c-54399011455e']
    response = repository.get_by_ids(ids).data
    pprint(response)