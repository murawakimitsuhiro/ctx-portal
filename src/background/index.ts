import browser from 'webextension-polyfill'
import { onMessage } from 'webext-bridge'
import { captureBrowseQueue, captureVisibleIfTabActive } from '~/logic'
import { MessageType } from '~/pkg/const/message'
import type { BrowseDocument } from '~/pkg/entity/capture-log'

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
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

// ローカルアプリの起動
const port = browser.runtime.connectNative('dev.mrwk.ctx_portal')

// ローカルアプリからメッセージ受信
port.onMessage.addListener((req) => {
  if (browser.runtime.lastError)
    console.log(browser.runtime.lastError.message)

  handleMessage(req)
})

// アプリから切断されたときの処理
port.onDisconnect.addListener(() => {
  if (browser.runtime.lastError)
    console.log(browser.runtime.lastError.message)

  console.debug('port', port)
  console.log('Disconnected')
})

function handleMessage(req: any) {
  console.log('req : ', req)
}

// ローカルアプリへメッセージ送信
port.postMessage({ type: 'ping', data: { text: 'ping' } })
port.postMessage({ type: 'hoge' })
