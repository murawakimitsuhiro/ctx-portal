import browser from 'webextension-polyfill';
import { useStorageLocal } from '~/composables/useStorageLocal';
import type { CaptureLog } from '~/pkg/entity/capture-log';

export const capturedLog = useStorageLocal<CaptureLog>(
  'captured-log',
  {
    img: '',
    datetime: new Date(),
    title: '',
    url: '',
    displayText: '',
    inputText: '',
  },
  { listenToStorageChanges: true },
)

export const captureVisibleIfTabActive = async (tabId: number) => {
  const tab = await browser.tabs.get(tabId)
  if (!tab.active)
    return
  return await browser.tabs.captureVisibleTab()

  // capturedLog.value = {
  //   img: captureImg,
  //   url: tab.url ?? '<unk>',
  //   title: tab.title ?? '<unk>',
  //   datetime: new Date(),
  //   displayText: '',
  //   inputText: '',
  // }
}
