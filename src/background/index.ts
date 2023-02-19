import browser from 'webextension-polyfill'
import { onMessage } from 'webext-bridge'
import { captureCurrentTab } from '~/logic'
import { MessageType } from '~/pkg/const/message'

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

let previousTabId = 0

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  // if (!previousTabId) {
  //   previousTabId = tabId
  //   return
  // }
  //
  // let tab: Tabs.Tab
  //
  // try {
  //   tab = await browser.tabs.get(previousTabId)
  //   previousTabId = tabId
  // }
  // catch {
  //   return
  // }

  // eslint-disable-next-line no-console
  // console.log('previous tab', tab)
  // sendMessage('tab-prev', { title: tab.title }, { context: 'content-script', tabId })
})

onMessage(MessageType.UserActivity, async (_) => {
  // const currentTab = await browser.tabs.query({
  //   active: true,
  //   lastFocusedWindow: true,
  // })
  // const captureImg = await browser.tabs.captureVisibleTab()
  //
  // const newLog = {
  //   img: captureImg,
  //   url: currentTab[0].url ?? '<unk>',
  //   title: currentTab[0].title ?? '<unk>',
  //   datetime: new Date(),
  //   displayText: '',
  //   inputText: '',
  // }
  // console.debug(newLog)
  // capturedLog.value = newLog
  captureCurrentTab()
    .catch((err) => {
      console.error(err)
    })
})

// onMessage('get-current-tab', async () => {
//   try {
//     const tab = await browser.tabs.get(previousTabId)
//     return {
//       title: tab?.title,
//     }
//   }
//   catch {
//     return {
//       title: undefined,
//     }
//   }
// })
