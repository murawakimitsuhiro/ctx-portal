import type { SearchedDocument } from '~/pkg/entity/searched-document'
import type { ScrapboxPage } from '~/pkg/service/scrapbox'

// 階層構造をによって表現されたドキュメントの関連ファイル
// 選択状態を管理する
export const useDocumentRelatedTree = () => {
  const _documents = ref<SearchedDocument[]>([])
  const _selectedIndexList = ref<number[]>([])

  const _lastHierarchy = computed(() => {
    return _selectedIndexList.value.length - 1
  })

  const documents = computed<SearchedDocument[]>(() => {
    if (_lastHierarchy.value < 0)
      return _documents.value
    return _documents.value.map((doc, index) => {
      return { ...doc, isSelected: index === _selectedIndexList.value[0] }
    })
  })

  const relatedDocuments = computed<[string: ScrapboxPage[]][]>(() => {
    if (_lastHierarchy.value < 0)
      return []
    return relatedPages(documents.value[_selectedIndexList.value[0]], _selectedIndexList.value.slice(1))
  })

  const focusedDocument = computed<SearchedDocument | null>(() => {
    if (_lastHierarchy.value < 0)
      return null
    if (_lastHierarchy.value === 0)
      return documents.value[_selectedIndexList.value[0]]

    const focusedLayerDocs = relatedDocuments.value[relatedDocuments.value.length - 1]
    return Object.values(focusedLayerDocs).flat(1)[_selectedIndexList.value[_lastHierarchy.value]]
  })

  const setDocuments = (newDocuments: SearchedDocument[]) => {
    _selectedIndexList.value = []
    _documents.value = newDocuments
  }

  const setSelectionDown = () => {
    if (_lastHierarchy.value < 0) {
      _selectedIndexList.value = [0]
      return
    }

    if (_lastHierarchy.value === 0 && documents.value.length > _selectedIndexList.value[0] + 1) {
      _selectedIndexList.value[0]++
      return
    }

    const currentHierarchyItemLength = Object.values(relatedDocuments.value[_lastHierarchy.value - 1]).flat(1).length
    if (currentHierarchyItemLength > _selectedIndexList.value[_lastHierarchy.value] + 1)
      _selectedIndexList.value[_lastHierarchy.value]++
  }

  const setSelectionUp = () => {
    if (_lastHierarchy.value < 0) {
      _selectedIndexList.value = [0]
      return
    }

    if (_selectedIndexList.value[_lastHierarchy.value] > 0)
      _selectedIndexList.value[_lastHierarchy.value]--
  }

  const setSelectionLeft = () => {
    if (_lastHierarchy.value >= 0)
      _selectedIndexList.value.pop()
  }

  const setSelectionRight = () => {
    _selectedIndexList.value.push(0)
  }

  return {
    documents: readonly(documents),
    relatedDocuments: readonly(relatedDocuments),
    focusedDocument: readonly(focusedDocument),
    setDocuments,
    setSelectionDown,
    setSelectionUp,
    setSelectionLeft,
    setSelectionRight,
  }
}

function relatedPages(doc: SearchedDocument | ScrapboxPage, selectedIndexes: number[]): [string: ScrapboxPage[]][] {
  if (!Object.hasOwn(doc, 'links'))
    return []

  const links = (doc as ScrapboxPage).links
  if (selectedIndexes.length === 0)
    return Object.keys(links).length === 0 ? [] : [links]

  let counter = 0
  let nextNestLinks: [string: ScrapboxPage[]][] = []
  Object.values(links).forEach((pages) => {
    pages.forEach((page) => {
      page.isSelected = false
      if (counter === selectedIndexes[0]) {
        page.isSelected = true
        nextNestLinks = relatedPages(page, selectedIndexes.slice(1))
        // nextNestLinks = page.links
      }
      counter++
    })
  })
  return [links].concat(nextNestLinks)
}

function relatedDocumentByIndex(scbPage: ScrapboxPage, index: number) {
  return Object.values(scbPage.links).flat(1)[index]
}
