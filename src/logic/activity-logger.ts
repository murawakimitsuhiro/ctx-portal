import { useThrottleFn } from '@vueuse/core'
import browser from 'webextension-polyfill'
import { useStorageLocal } from '~/composables/useStorageLocal'
import type { BrowseDocument, UserBrowseLog } from '~/pkg/entity/capture-log'
import { NativeAppService } from '~/pkg/service/native-app'
import { supabase } from '~/pkg/service/supabase'
import { getHistory } from '~/pkg/util/histories'

const throttleCaptureSeconds = 30
// const ignoreBlockTypes = [
//   'CAPTION_TEXT',
//   'HORZ_LINE',
//   'VERT_LINE',
//   'NOISE',
//   'COUNT',
// ]
// const thresholdConfidence = 75
const recentHistoryMinutes = 20

export const captureBrowseQueue = useStorageLocal<UserBrowseLog[]>(
  'capture-browse-queue',
  [],
)

const captureThrottle = useThrottleFn(async (tabId: number, timestamp: Date): Promise<{ img: string; timestamp: Date } | null> => {
  const tab = await browser.tabs.get(tabId)
  if (!tab.active)
    return null
  const img = await browser.tabs.captureVisibleTab()
  return { img, timestamp }
}, 1000 * throttleCaptureSeconds, false, true, true)

// called background
export const captureVisibleTabAndSendNativeApp = async (
  tabId: number,
  doc: BrowseDocument,
) => {
  const now = new Date()
  const captured = await captureThrottle(tabId, now)
  if (!captured || captured.timestamp !== now)
    return

  const latestSavedTime = await getHistoryLatestSavedTime()
  const recentHistories = await getHistory(recentHistoryMinutes, latestSavedTime ?? undefined)
  const sendData = {
    img: captured.img,
    timestamp: captured.timestamp,
    document: doc,
    histories: recentHistories,
  }
  NativeAppService.shared().sendUserActivity(sendData)
}

async function getHistoryLatestSavedTime(): Promise<number | null> {
  const { data } = await supabase.from('histories').select()
    .order('last_visit_time', { ascending: false })
    .limit(1)
  if (data && data.length === 0)
    return null
  return data![0].last_visit_time
}

// called content script
// export const OCRBroseImage = async (img: string): Promise<Paragraph[] | null> => {
//   const result = await TesseractService.shared().recognize(img)
//   // OCRの結果を見たい場合
//   // console.debug('ocr result : ', result)
//   const { data: { blocks } } = result
//
//   if (!blocks)
//     return null
//
//   return blocks.reduce((acc: Paragraph[], block) => {
//     if (ignoreBlockTypes.includes(block.blocktype) || block.confidence < thresholdConfidence)
//       return acc
//
//     const ps = block.paragraphs
//       ?.filter(p => p.text.trim().length > 0 && p.confidence >= thresholdConfidence)
//       .map((p) => {
//         return {
//           text: p.text.replace(/(?<![a-z])\s+(?![a-z])/gm, ''),
//           confidence: p.confidence,
//         }
//       }) ?? []
//     return acc.concat(ps)
//   }, [])
// }
