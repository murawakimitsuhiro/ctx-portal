import datetime
import numpy as np
from attr import dataclass
from typing import Optional

from qdrant_client.http import models

@dataclass
class DocumentOpenContext:
    title: str
    url: str
    document_uuid: str
    history_uuid: str
    created_at: float
    updated_at: Optional[float] = None

    @classmethod
    def from_dict(cls, d):
        return cls(**d)

    def get_created_at(self) -> str:
        return datetime.datetime.fromtimestamp(self.created_at/1000).isoformat()

    def get_updated_at(self) -> str:
        return datetime.datetime.fromtimestamp(self.updated_at/1000).isoformat()

    def point_struct(self, vector: models.VectorStruct) -> models.PointStruct:
        return models.PointStruct(
            id=str(self.history_uuid),
            payload=vars(self),
            vector=vector,
        )

if __name__ == '__main__':
    from pprint import pprint
    import uuid
    # dummy document open context dict
    doc_open_context_dict = {
        "created_at": 1677852806805.98,
        "title": "test",
        "url": "https://example.com",
        "document_uuid": "test-test",
        "history_uuid": uuid.uuid4(),
    }
    doc_open_ctx = DocumentOpenContext.from_dict(doc_open_context_dict)
    pprint(doc_open_ctx)
    print(doc_open_ctx.get_created_at())
    print(doc_open_ctx.point_struct(np.array([0.1, 0.2, 0.3]).tolist()))