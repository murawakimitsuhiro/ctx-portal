import datetime
from attr import dataclass
from typing import Optional

@dataclass
class DocumentOpenContext:
    id: int
    title: str
    url: str
    document_uuid: str
    history_uuid: str
    created_at_ms: float
    updated_at_ms: Optional[float] = None

    @classmethod
    def from_dict(cls, d):
        return cls(**d)

    def get_created_at(self) -> str:
        return datetime.datetime.fromtimestamp(self.created_at_ms/1000).isoformat()

    def get_updated_at(self) -> str:
        return datetime.datetime.fromtimestamp(self.updated_at_ms/1000).isoformat()

if __name__ == '__main__':
    from pprint import pprint
    # dummy document open context dict
    doc_open_context_dict = {
        "id": 1,
        "created_at_ms": 1677852806805.98,
        "title": "test",
        "url": "https://example.com",
        "document_uuid": "test-test",
        "history_uuid": "test-test",
    }
    doc_open_ctx = DocumentOpenContext.from_dict(doc_open_context_dict)
    pprint(doc_open_ctx)
    print(doc_open_ctx.get_created_at())