import sys
from os.path import dirname, abspath
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, Batch

parent_dir = dirname(dirname(abspath(__file__)))
sys.path.append(parent_dir)

from pkg.sbert import SentenceBertJapanese

class DocumentContextVectorRepository:
    def __init__(
            self, 
            host: str, port: int, 
            embedding_model,
            params: VectorParams = VectorParams(size=768, distance=Distance.COSINE)
    ):
        self.client = QdrantClient(host=host, port=port)
        self.model = embedding_model
        self.params = params
        self.collection_name = 'document_contexts'

    def recreate(self):
        self.client.recreate_collection(
            collection_name=self.collection_name, 
            vectors_config=self.params,
        )

    def upload(self, vectors, payload, ids=None):
        self.client.upload_collection(
            collection_name=self.collection_name,
            vectors=vectors,
            payload=payload,
            ids=ids,
            batch_size=256
        )
    
    def upsert(self, vectors, payloads, ids=None):
        self.client.upsert(
            collection_name=self.collection_name,
            points=Batch(
                ids=ids,
                payloads=payloads,
                vectors=vectors
            )
        )

    def search(self, text: str, limit: int=20):
        vector = self.model.encode([text]).numpy()[0]
        result = self.client.search(
            collection_name=self.collection_name,
            query_vector=vector,
            query_filter=None,
            with_payload=True,
            limit=limit,
        )
        # print(result)
        payloads = [hit.payload for hit in result]
        return payloads


if __name__ == '__main__':
    model = SentenceBertJapanese()
    repo = DocumentContextVectorRepository(host='localhost', port=6333, embedding_model=model)

    texts = ['私は猫です', '私は犬です', '私はコアラです']
    payload = [
        {'label': 'cat'},
        {'label': 'dog'},
        {'label': 'koala'},
    ]

    sentence_vectors = model.encode(texts).numpy()
    
    repo.recreate() # migration
    repo.upload(sentence_vectors, payload) # insert
    searched = repo.search('ユーカリ', limit=1) #search
    print(searched)