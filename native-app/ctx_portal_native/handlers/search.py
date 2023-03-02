
class SearchHandler():
    def __init__(self, usecases):
        self.usecases = usecases
        
    def handle_context_search(self, data):
        result = self.usecases.search_document.search_by_context(data['context'])
        return ('search-context', {'documents': result})
        