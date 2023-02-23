import browser from 'webextension-polyfill'
import { onMessage } from 'webext-bridge'
import { captureVisibleTabAndSendNativeApp } from '~/logic'
import { MessageType } from '~/pkg/const/message'

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

onMessage(MessageType.UserActivity, async ({ data, sender }) => {
  await captureVisibleTabAndSendNativeApp(sender.tabId, data)
})

// async function sendTestCapture() {
//   const key = 'capture-browse-queue'
//   const capturedList: UserBrowseLog[] = JSON.parse((await browser.storage.local.get(key))[key])
//   const latest = capturedList[30]
//   const data = {
//     img: latest.img,
//     document: latest.document,
//     timestamp: latest.datetime,
//   }
//   NativeAppService.shared().sendUserActivity(data)
// }

