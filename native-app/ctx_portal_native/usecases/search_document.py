from typing import List
import sys
from os.path import dirname, abspath
from postgrest import SyncPostgrestClient

parent_dir = dirname(dirname(abspath(__file__)))
sys.path.append(parent_dir)
from value_object.searched_document import SearchedDocument
from repositories.document_context_vector import DocumentContextVectorRepository
from repositories.document import DocumentRepository
from pkg.sbert import SentenceBertJapanese

class SearchDocumentUsecase:
    def __init__(self, document_repository: DocumentRepository, document_context_vector_repository: DocumentContextVectorRepository):
        self.documents = document_repository
        self.ctx_vectors = document_context_vector_repository

    def search_by_context(self, context_text: str) -> List[SearchedDocument]:
        similer_doc_points = self.ctx_vectors.search(context_text)
        ids = [p['document_id'] for p in similer_doc_points]
        docs = self.documents.get_by_ids(ids)
        return docs


if __name__ == '__main__':
    from pprint import pprint
    from dependency import AppDependencies

    search_doc_usecase = AppDependencies().usecases.search_document

    docs = search_doc_usecase.search_by_context('日本の経済地理学')
    pprint(docs)
