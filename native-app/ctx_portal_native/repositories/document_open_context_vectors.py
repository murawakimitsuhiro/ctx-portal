import sys
import pprint
from os.path import dirname, abspath
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, Batch

parent_dir = dirname(dirname(abspath(__file__)))
sys.path.append(parent_dir)

from pkg.sbert import SentenceBertJapanese
from repositories.document_context_vector import DocumentContextVectorRepository

class DocumentOpenContextVectorRepository:
    def __init__(
            self, 
            host: str, port: int, 
            embedding_model,
            params: VectorParams = VectorParams(size=768, distance=Distance.COSINE)
    ):
        self.client = QdrantClient(host=host, port=port)
        self.model = embedding_model
        self.params = params
        self.collection_name = 'document_open_contexts'

    def recreate(self):
        self.client.recreate_collection(
            collection_name=self.collection_name, 
            vectors_config=self.params,
        )

def migration_from_document_contexts():
    model = SentenceBertJapanese()
    old_repo = DocumentContextVectorRepository(host='localhost', port=6333, embedding_model=model)
    (records, next_offset) = old_repo.scroll()
    print([r.id for r in records])


if __name__ == '__main__':
    model = SentenceBertJapanese()
    repo = DocumentOpenContextVectorRepository(host='localhost', port=6333, embedding_model=model)
    migration_from_document_contexts()
    