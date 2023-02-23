import browser from 'webextension-polyfill'
import { onMessage } from 'webext-bridge'
import { captureBrowseQueue, captureVisibleTabAndSendNativeApp } from '~/logic'
import { MessageType } from '~/pkg/const/message'
import type { BrowseDocument, UserBrowseLog } from '~/pkg/entity/capture-log'
import { NativeAppService } from '~/pkg/service/native-app'
import { supabase } from '~/pkg/service/supabase'
import { getHistory } from '~/pkg/util/histories'

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
  // sendTestCapture()
  // NativeAppService.shared().sendMessage('ping', { text: 'hello from background script' })
})


onMessage(MessageType.UserActivity, async ({ data, sender }) => {
  await captureVisibleTabAndSendNativeApp(sender.tabId, data)
})

onMessage(MessageType.CaptureBrowse, async ({ data }) => {
  captureBrowseQueue.value.push(data)
  console.debug('saved capture ', data)
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

