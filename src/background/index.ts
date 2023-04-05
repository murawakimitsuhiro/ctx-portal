import browser from 'webextension-polyfill'
// import { ref } from 'vue'
import { Destination, onMessage, sendMessage } from 'webext-bridge'
import { captureVisibleTabAndSendNativeApp } from '~/logic'
import { InnerMessageType, NativeMessageType } from '~/pkg/const/message'
import type { SearchedDocument } from '~/pkg/entity/searched-document'
import { NativeAppService } from '~/pkg/service/native-app'

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
  NativeAppService.shared().sendSearchContext() // ContextSearchのテストのために送っている
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

onMessage(InnerMessageType.UserActivity, async ({ data, sender }) => {
  await captureVisibleTabAndSendNativeApp(sender.tabId, data)
})


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

