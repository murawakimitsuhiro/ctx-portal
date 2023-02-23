import browser from 'webextension-polyfill'
import { onMessage } from 'webext-bridge'
import { captureBrowseQueue, captureVisibleIfTabActive } from '~/logic'
import { MessageType } from '~/pkg/const/message'
import type { BrowseDocument, UserBrowseLog } from '~/pkg/entity/capture-log'
import { NativeAppService } from '~/pkg/service/native-app'
import { getHistory } from '~/pkg/util/histories'

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
  getHistory(15, 1677161041577.3)
    .then((history) => console.debug('history', history))
  // sendTestCapture()
  // NativeAppService.shared().sendMessage('ping', { text: 'hello from background script' })
})

onMessage(MessageType.UserActivity, async ({ data, sender }): Promise<{
  document: BrowseDocument
  img: string
  timestamp: Date } | null> => {
  const captureResult = await captureVisibleIfTabActive(sender.tabId)
  if (!captureResult)
    return null

  const { img, timestamp } = captureResult
  return { document: data, img, timestamp }
})

onMessage(MessageType.CaptureBrowse, async ({ data }) => {
  captureBrowseQueue.value.push(data)
  console.debug('saved capture ', data)
})

async function sendTestCapture() {
  const key = 'capture-browse-queue'
  const capturedList: UserBrowseLog[] = JSON.parse((await browser.storage.local.get(key))[key])
  const latest = capturedList[30]
  const data = {
    img: latest.img,
    document: latest.document,
    timestamp: latest.datetime,
  }
  NativeAppService.shared().sendUserActivity(data)
}

