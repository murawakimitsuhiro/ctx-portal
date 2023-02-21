import browser from 'webextension-polyfill'
import { onMessage } from 'webext-bridge'
import { captureBrowseQueue, captureVisibleIfTabActive } from '~/logic'
import { MessageType } from '~/pkg/const/message'

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

onMessage(MessageType.UserActivity, async ({ sender }): Promise<{ img: string; timestamp: Date } | null> => {
  return await captureVisibleIfTabActive(sender.tabId)
})

onMessage(MessageType.CaptureBrowse, async ({ data }) => {
  captureBrowseQueue.value.push(data)
  console.debug('saved ', data)
})
