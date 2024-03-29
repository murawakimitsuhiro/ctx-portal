import browser from 'webextension-polyfill'
// import { ref } from 'vue'
import type { Destination } from 'webext-bridge'
import { onMessage, sendMessage } from 'webext-bridge'
import { captureVisibleTabAndSendNativeApp } from '~/logic'
import { InnerMessageType, NativeMessageType } from '~/pkg/const/message'
import type { SearchedDocument } from '~/pkg/entity/searched-document'
import { NativeAppService } from '~/pkg/service/native-app'
import { getRelation, ScrapboxPage } from '~/pkg/service/scrapbox'
import { getCurrentContextHistories } from '~/pkg/util/histories'

export interface BackgroundState {
  searchedDocuments: SearchedDocument[]
  latestActivatedTabId: number | null
}

const state: BackgroundState = {
  searchedDocuments: [] as SearchedDocument[],
  latestActivatedTabId: null,
}

async function currentActiveTabDestination(): Promise<Destination> {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
  return { context: 'content-script', tabId: tab.id! }
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')

  // sendTestCapture()
  getCurrentContextHistories().then((histories) => {
    const contextStr = histories.reduce((acc, cur) => `${acc + cur.title}\n`, '')
    NativeAppService.shared().sendSearchContext(contextStr) // ContextSearchのテストのために送っている
  })
  NativeAppService.shared().registerHandler(NativeMessageType.receive.SearchContext, async (data) => {
    state.searchedDocuments = await Promise.all(
      data.documents.map(async (doc) => {
        const url = new URL(doc.url)
        if (url.hostname === 'scrapbox.io') {
          try {
            const scbPage = await getRelation(url)
            return scbPage
          }
          catch (e) {
            return doc
          }
        }
        return doc
      }),
    )
    console.debug('documents ', state.searchedDocuments)
    sendStateForLatestActivatedTab()
    fetchRelatedScbPage().then()
  })
})

async function fetchRelatedScbPage() {
  // 試しに一つだけ取得
  for (const pages of Object.values((state.searchedDocuments[0] as ScrapboxPage).links)) {
    for (const page of pages)
      page.links = (await getRelation(new URL(page.url))).links
  }
  sendStateForLatestActivatedTab()
}

browser.commands.onCommand.addListener(async (command) => {
  if (command === 'open-search-modal') {
    const destination = await currentActiveTabDestination()
    sendMessage(InnerMessageType.OnOpenSearchModal, state, destination).then()
  }
})

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  state.latestActivatedTabId = tabId
  sendStateForLatestActivatedTab()
})

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  state.latestActivatedTabId = tabId
  sendStateForLatestActivatedTab()
})

function sendStateForLatestActivatedTab() {
  if (state.latestActivatedTabId) {
    sendMessage(
      InnerMessageType.UpdateBackgroundState,
      state,
      {
        context: 'content-script',
        tabId: state.latestActivatedTabId,
      },
    ).then()
  }
}

function sendCurrentContextForNativeApp() {
  getCurrentContextHistories().then((histories) => {
    const contextStr = histories.reduce((acc, cur) => `${acc + cur.title}\n`, '')
    NativeAppService.shared().sendSearchContext(contextStr)
  })
}

onMessage(InnerMessageType.UserActivity, async ({ data, sender }) => {
  await captureVisibleTabAndSendNativeApp(sender.tabId, data)
})

// 1min に一度、現在のContextを更新している
setInterval(sendCurrentContextForNativeApp, 1000 * 60)

// setInterval(() => {
//   sendMessage(InnerMessageType.UpdateBackgroundState, state, 'content-script')
//   console.debug('sended with timer')
// }, 3000)

// async function sendTestCapture() {
//   const key = 'capture-browse-queue'
//   const capturedList = JSON.parse((await browser.storage.local.get(key))[key])
//   const latest = capturedList[40]
//   const data = {
//     img: latest.img,
//     document: latest.document,
//     timestamp: latest.datetime,
//   }
//   console.debug('sended', data)
//   NativeAppService.shared().sendUserActivity(data)
// }

