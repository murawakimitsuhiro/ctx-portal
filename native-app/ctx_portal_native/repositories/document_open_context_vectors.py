import sys
import pprint
import datetime
import pandas as pd
from os.path import dirname, abspath
from typing import List
from qdrant_client import QdrantClient, models

parent_dir = dirname(dirname(abspath(__file__)))
sys.path.append(parent_dir)

from pkg.sbert import SentenceBertJapanese
from repositories.document_context_vector import DocumentContextVectorRepository
from repositories.histories import HistoriesRepository
from models.document_open_context import DocumentOpenContext
from repositories.posgresql import postgresql_session

class DocumentOpenContextVectorRepository:
    def __init__(
            self, 
            host: str, port: int, 
            embedding_model,
            params: models.VectorParams = models.VectorParams(size=768, distance=models.Distance.COSINE)
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

    def upsert(self, points: List[models.PointStruct]):
        self.client.upsert(
            collection_name=self.collection_name,
            points=points
        )

failed_points = []

def digits_after_decimal_point(num):
    if isinstance(num, float):
        return len(str(num).split('.')[1])
    else:
        return 0

def migration_from_document_contexts(offset=None):
    session = postgresql_session()
    history_repo = HistoriesRepository(session)
    model = SentenceBertJapanese()
    old_repo = DocumentContextVectorRepository(host='localhost', port=6333, embedding_model=model)
    new_repo = DocumentOpenContextVectorRepository(host='localhost', port=6333, embedding_model=model)

    (records, next_offset) = old_repo.scroll(offset_id=offset)
    upsert_points = []
    for r in records:
        last_visit_time = r.payload['last_visit_time']
        if digits_after_decimal_point(last_visit_time) > 0:
            last_visit_time = last_visit_time / 1000
        his = history_repo.get_by_id_and_time(r.payload['id'], last_visit_time)
        if his is None:
            print('not mateched history', r.payload)
            failed_points.append(r.payload)
            continue
        doc_open_context_dict = {
            "created_at": datetime.datetime.now(),
            "title": r.payload['title'],
            "url": r.payload['url'],
            "document_uuid": r.payload['document_id'],
            "history_uuid": his.uuid,
        }
        doc_open_ctx = DocumentOpenContext.from_dict(doc_open_context_dict)
        doc_open_ctx_p = doc_open_ctx.point_struct(vector=r.vector)
        upsert_points.append(doc_open_ctx_p)

    new_repo.upsert(upsert_points)
    print('upserted ', min([r.id for r in records]), ' to ', max([r.id for r in records]))

    if next_offset is not None:
        migration_from_document_contexts(next_offset)

if __name__ == '__main__':
    model = SentenceBertJapanese()
    repo = DocumentOpenContextVectorRepository(host='localhost', port=6333, embedding_model=model)
    migration_from_document_contexts()
    
    failed_df = pd.DataFrame(failed_points)
    failed_df.to_csv('failed_points.csv')
    
    # 丸め誤差の考慮
    # target(db) 1677762248.3795898
    # pointに保存されている 1677762248379.59
    # session = postgresql_session()
    # history_repo = HistoriesRepository(session)
    # h = history_repo.get_by_id_and_time(75432, 1677762248379.59/1000)
    # print(h)
    # 'id': 75432, 'last_visit_time': 1677762248379.59,
    