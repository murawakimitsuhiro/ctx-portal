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

  const relatedDocuments = computed<SearchedDocument[][]>(() => {
    // return _selectedIndexList.value.reduce((acc, cur) => {
    //   const currentHierarchySelectedDoc = acc[acc.length - 1]
    //   acc[acc.length - 1].isSelected = true
    //   if (Object.hasOwn(currentHierarchySelectedDoc, 'links'))
    //     return acc.concat(relatedDocumentByIndex(currentHierarchySelectedDoc as ScrapboxPage, cur))
    //   return acc.concat([])
    // }, _documents.value)
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
      console.debug('set indexes', _selectedIndexList.value)
      return
    }
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

  return { documents: readonly(documents), setDocuments, setSelectionDown, setSelectionUp }
}

function relatedDocumentByIndex(scbPage: ScrapboxPage, index: number) {
  return Object.values(scbPage.links).flat(1)[index]
}
