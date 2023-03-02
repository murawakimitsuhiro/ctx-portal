from usecases.search_document import SearchDocumentUsecase
from postgrest import SyncPostgrestClient
from pkg.sbert import SentenceBertJapanese
from repositories.document import DocumentRepository
from repositories.document_context_vector import DocumentContextVectorRepository

# def app_dependencies():
#     client = SyncPostgrestClient('http://localhost:3000')
#     doc_repo = DocumentRepository(client)

#     model = SentenceBertJapanese()
#     ctx_repo = DocumentContextVectorRepository(host='localhost', port=6333, embedding_model=model)

#     return {
#         'repositories': {
#             'document': doc_repo,
#             'context': ctx_repo,
#         },
#         'usecases': {
#             'search_document': SearchDocumentUsecase(doc_repo, ctx_repo)
#         }
#     }

class AppDependencies:
    def __init__(self):
        self.client = SyncPostgrestClient('http://localhost:3000')
        self.doc_repo = DocumentRepository(self.client)

        self.model = SentenceBertJapanese()
        self.ctx_repo = DocumentContextVectorRepository(host='localhost', port=6333, embedding_model=self.model)

        self.usecases = UseCases(
            SearchDocumentUsecase(self.doc_repo, self.ctx_repo)
        )

class UseCases:
    def __init__(self, search_document):
        self.search_document = search_document