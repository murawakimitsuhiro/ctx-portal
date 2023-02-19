import browser from 'webextension-polyfill'
import { onMessage } from 'webext-bridge'
import { captureVisibleIfTabActive } from '~/logic'
import { MessageType } from '~/pkg/const/message'

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
  // console.log(import.meta..env)
})

onMessage(MessageType.UserActivity, async ({ sender }) => {
  const img = await captureVisibleIfTabActive(sender.tabId)
    .catch(err => console.error('captureCurrentTab error', err))
  return { capturedImg: img ?? null }
})
