from typing import TypedDict

class BrowseParagraphLog(TypedDict):
    timestamp: str
    document_id: str
    paragraph_ids: list[str]
    capture_img: str

class Document(TypedDict):
    id: str
    title: str
    url: str

class Paragraph(TypedDict):
    id: str
    text: str
    document_id: str
