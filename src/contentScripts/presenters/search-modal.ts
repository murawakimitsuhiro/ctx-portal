import { onMessage } from 'webext-bridge'
import { InnerMessageType } from '~/pkg/const/message'
import type { SearchedDocument } from '~/pkg/entity/searched-document'

export const SearchModalPresenter = () => {
  const _selectedIndex = ref<number | null>(null)

  const showModal = ref(false)
  const searchedDocs = ref<SearchedDocument[]>([])
  const selectedDoc = computed<SearchedDocument | null>(() => {
    // return _selectedIndex.value ? searchedDocs.value[_selectedIndex.value] : null
    return searchedDocs.value[_selectedIndex.value ?? 0]
  })
  const searchQuery = ref('')

  const toggleModalShow = () => {
    showModal.value = !showModal.value
  }

  const closeModal = () => {
    showModal.value = false
  }

  const setSelectionDown = () => {
    if (_selectedIndex.value === null) {
      _selectedIndex.value = 0 // searchedDocs.value.length - 1
      return
    }
    if (searchedDocs.value.length > _selectedIndex.value + 1)
      _selectedIndex.value++
  }
  const setSelectionUp = () => {
    if (_selectedIndex.value === null) {
      _selectedIndex.value = 0 // searchedDocs.value.length - 1
      return
    }

    if (_selectedIndex.value > 0)
      _selectedIndex.value--
  }

  const _setSearchedDocs = (docs: SearchedDocument[]) => {
    searchedDocs.value = docs
  }

  const openSelectedDoc = (openInNewTab: Boolean = false) => {
    console.debug('openSelectedDoc', openInNewTab, selectedDoc.value)
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  onMessage(InnerMessageType.UpdateBackgroundState, ({ data }) => {
    console.debug('updated background state (presenter)', data.searchedDocuments)
    _setSearchedDocs(data.searchedDocuments)
  })

  onMessage(InnerMessageType.OnOpenSearchModal, ({ data }) => {
    showModal.value = !showModal.value
    _setSearchedDocs(data.searchedDocuments)
  })

  return {
    state: {
      showModal: readonly(showModal),
      searchedDocs: readonly(searchedDocs),
      selectedDoc: readonly(selectedDoc),
      searchQuery: readonly(searchQuery),
    },
    action: {
      toggleModalShow, closeModal, setSelectionDown, setSelectionUp, openSelectedDoc, setSearchQuery,
    },
  }
}
