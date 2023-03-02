from repositories.document import DocumentRepository


class SearchDocumentUsecase:
    def __init__(self, document_repository: DocumentRepository):
        self.document_repository = document_repository

    def execute(self, query: str) -> [Document]:
        return self.document_repository.search(query)