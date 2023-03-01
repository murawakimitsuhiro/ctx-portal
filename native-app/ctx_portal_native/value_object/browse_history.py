from typing import TypedDict

class BrowseHistory(TypedDict):
    id: str 
    last_visit_time: float
    title: str
    url: str 
    uuid: str
