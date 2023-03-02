import browser from 'webextension-polyfill'
// import { ref } from 'vue'
import { onMessage, sendMessage } from 'webext-bridge'
import { captureVisibleTabAndSendNativeApp } from '~/logic'
import { InnerMessageType, NativeMessageType } from '~/pkg/const/message'
import type { SearchedDocument } from '~/pkg/entity/searched-document'
import { NativeAppService } from '~/pkg/service/native-app'

export interface BackgroundState {
  searchedDocuments: SearchedDocument[]
}

const state: BackgroundState = {
  searchedDocuments: [] as SearchedDocument[],
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
  // sendTestCapture()
  NativeAppService.shared().sendSearchContext()
  NativeAppService.shared().registerHandler(NativeMessageType.receive.SearchContext, (docs) => {
    state.searchedDocuments = docs
    sendMessage(InnerMessageType.UpdateBackgroundState, state).then()
    console.debug('sended from bg', state)
  })
})

onMessage(InnerMessageType.UserActivity, async ({ data, sender }) => {
  await captureVisibleTabAndSendNativeApp(sender.tabId, data)
})

// onMessage(InnerMessageType.GetBackgroundState, ({ sender }) => {
//   console.debug(sender.tabId)
//   sendMessage(InnerMessageType.UpdateBackgroundState, state, { context: 'content-script', tabId: sender.tabId })
//   console.debug('sended with request')
// })

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  sendMessage(InnerMessageType.UpdateBackgroundState, state, { context: 'content-script', tabId })
  console.debug('sended for ', tabId)
  // console.log('previous tab', tab)
  // sendMessage('tab-prev', { title: tab.title }, { context: 'content-script', tabId })
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

