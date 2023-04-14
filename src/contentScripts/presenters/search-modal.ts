import { onMessage } from 'webext-bridge'
import { useDocumentRelatedTree } from '~/contentScripts/composables/useDocumentRelatedTree'
import { InnerMessageType } from '~/pkg/const/message'
import type { SearchedDocument } from '~/pkg/entity/searched-document'


export const SearchModalPresenter = () => {
  const documentTree = useDocumentRelatedTree()
  const showModal = ref(false)
  const searchQuery = ref('')

  const toggleModalShow = () => {
    showModal.value = !showModal.value
  }

  const closeModal = () => {
    showModal.value = false
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const openSelectedDoc = (openInNewTab: Boolean = false) => {
    // console.debug('openSelectedDoc', openInNewTab, selectedDoc.value)
    // const url = selectedDoc.value?.url
    // if (openInNewTab)
    //   window.open(url!, '_blank')
    // else
    //   window.location.href = url!
  }

  // const setSelectionDown = () => _documentTree.setSelectionDown()
  // const setSelectionUp = () => _documentTree.setSelectionUp()

  onMessage(InnerMessageType.UpdateBackgroundState, ({ data }) => {
    console.debug('updated background state (presenter)', data.searchedDocuments)
    // _setSearchedDocs(data.searchedDocuments)
    documentTree.setDocuments(data.searchedDocuments)
  })

  onMessage(InnerMessageType.OnOpenSearchModal, ({ data }) => {
    showModal.value = !showModal.value
    documentTree.setDocuments(data.searchedDocuments)
    // _setSearchedDocs(data.searchedDocuments)
  })

  return {
    state: {
      documents: documentTree.documents,
      relatedDocuments: documentTree.relatedDocuments,
      showModal: readonly(showModal),
      // searchedDocs: readonly(searchedDocs),
      // selectedDoc: readonly(selectedDoc),
      searchQuery: readonly(searchQuery),
    },
    action: {
      toggleModalShow,
      closeModal,
      setSelectionDown: documentTree.setSelectionDown,
      setSelectionUp: documentTree.setSelectionUp,
      openSelectedDoc,
      setSearchQuery,
    },
  }
}
