import { useStorage } from '@vueuse/core'
import browser from 'webextension-polyfill'
// import { useStorageLocal } from '~/composables/useStorageLocal'
import type { CaptureLog } from '~/pkg/entity/capture-log'

export const capturedLog = useStorage<CaptureLog>(
  'captured-log',
  {
    img: '',
    datetime: new Date(),
    title: '',
    url: '',
    displayText: '',
    inputText: '',
  },
)

export const captureVisibleIfTabActive = async (tabId: number) => {
  const tab = await browser.tabs.get(tabId)
  if (!tab.active)
    return
  return await browser.tabs.captureVisibleTab()
}
