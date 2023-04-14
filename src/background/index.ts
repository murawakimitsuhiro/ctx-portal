import browser from 'webextension-polyfill'
// import { ref } from 'vue'
import { Destination, getCurrentContext, onMessage, sendMessage } from 'webext-bridge'
import { captureVisibleTabAndSendNativeApp } from '~/logic'
import { InnerMessageType, NativeMessageType } from '~/pkg/const/message'
import type { SearchedDocument } from '~/pkg/entity/searched-document'
import { NativeAppService } from '~/pkg/service/native-app'
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
  NativeAppService.shared().registerHandler(NativeMessageType.receive.SearchContext, (data) => {
    state.searchedDocuments = data.documents
    sendStateForLatestActivatedTab()
  })
})

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

