import type { SearchedDocument } from '~/pkg/entity/searched-document'
import { ScrapboxPage } from '~/pkg/service/scrapbox'

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
    const related = relatedPages(documents.value[_selectedIndexList.value[0]], _selectedIndexList.value.slice(1))
    return related
    // return _selectedIndexList.value.reduce((acc, cur) => {
    //   const currentHierarchySelectedDoc = _lastHierarchy === 0 ? documents[cur] : acc[acc.length - 1][cur]
    //   acc[acc.length - 1].isSelected = true
    //   if (Object.hasOwn(currentHierarchySelectedDoc, 'links'))
    //     return acc.concat(relatedDocumentByIndex(currentHierarchySelectedDoc as ScrapboxPage, cur))
    //   return acc.concat([])
    // }, [])
  })

  const setDocuments = (newDocuments: SearchedDocument[]) => {
    _selectedIndexList.value = []
    _documents.value = newDocuments
  }

  const setSelectionDown = () => {
    if (_lastHierarchy.value < 0) {
      _selectedIndexList.value = [0]
      console.debug('set indexes', _selectedIndexList.value)
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
      console.debug('set indexes', _selectedIndexList.value)
      return
    }

    if (_selectedIndexList.value[_lastHierarchy.value] > 0)
      _selectedIndexList.value[_lastHierarchy.value]--

    console.debug('set indexes', _selectedIndexList.value)
  }

  const setSelectionLeft = () => {
    if (_lastHierarchy.value >= 0)
      _selectedIndexList.value.pop()

    console.debug('set indexes', _selectedIndexList.value)
  }

  const setSelectionRight = () => {
    _selectedIndexList.value.push(0)

    console.debug('set indexes', _selectedIndexList.value)
  }

  return {
    documents: readonly(documents),
    relatedDocuments: readonly(relatedDocuments),
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
    return [links]

  let counter = 0
  let nextNestLinks: [string: ScrapboxPage[]] = []
  Object.values(links).forEach((pages) => {
    pages.forEach((page) => {
      page.isSelected = false
      if (counter === selectedIndexes[0]) {
        page.isSelected = true
        nextNestLinks = page.links
      }
      counter++
    })
  })
  return [links, nextNestLinks]
}

function relatedDocumentByIndex(scbPage: ScrapboxPage, index: number) {
  return Object.values(scbPage.links).flat(1)[index]
}
