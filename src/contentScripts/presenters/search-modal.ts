import { onMessage } from 'webext-bridge'
import { useDocumentRelatedTree } from '~/contentScripts/composables/useDocumentRelatedTree'
import { InnerMessageType } from '~/pkg/const/message'

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

  onMessage(InnerMessageType.UpdateBackgroundState, ({ data }) => {
    console.debug('updated background state (presenter)', data.searchedDocuments)
    documentTree.setDocuments(data.searchedDocuments)
  })

  onMessage(InnerMessageType.OnOpenSearchModal, ({ data }) => {
    showModal.value = !showModal.value
    documentTree.setDocuments(data.searchedDocuments)
  })

  return {
    state: {
      documents: documentTree.documents,
      relatedDocuments: documentTree.relatedDocuments,
      showModal: readonly(showModal),
      searchQuery: readonly(searchQuery),
    },
    action: {
      toggleModalShow,
      closeModal,
      setSelectionDown: documentTree.setSelectionDown,
      setSelectionUp: documentTree.setSelectionUp,
      setSelectionLeft: documentTree.setSelectionLeft,
      setSelectionRight: documentTree.setSelectionRight,
      openSelectedDoc,
      setSearchQuery,
    },
  }
}
