import browser from 'webextension-polyfill'
import { onMessage } from 'webext-bridge'
import { captureVisibleIfTabActive } from '~/logic';
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

// onMessage(MessageType.UserActivity, async (_) => {
//   const currentTab = await browser.tabs.query({
//     active: true,
//     lastFocusedWindow: true,
//   })
//
//   captureCurrentTab()
//     .catch((err) => {
//       console.error(err)
//     })
// })

onMessage(MessageType.UserActivity, async ({ sender }) => {
  const img = await captureVisibleIfTabActive(sender.tabId)
    .catch(err => console.error('captureCurrentTab error', err))
  return { capturedImg: img }
})
