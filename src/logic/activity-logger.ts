import browser from 'webextension-polyfill'
import { useThrottleFn } from '@vueuse/core'
import { useStorageLocal } from '~/composables/useStorageLocal'
import type { CaptureBrowse, Paragraph } from '~/pkg/entity/capture-log'
import TesseractService from '~/pkg/service/ocr'

const throttleCaptureSeconds = 6
const ignoreBlockTypes = [
  'CAPTION_TEXT',
  'HORZ_LINE',
  'VERT_LINE',
  'NOISE',
  'COUNT',
]
const thresholdConfidence = 75

export const captureBrowseQueue = useStorageLocal<CaptureBrowse[]>(
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
export const captureVisibleIfTabActive = async (tabId: number): Promise<{ img: string; timestamp: Date } | null> => {
  const now = new Date()
  const captured = await captureThrottle(tabId, now)
  if (!captured)
    return null
  if (captured.timestamp === now)
    return captured
  return null
}

// called content script
export const OCRBroseImage = async (img: string): Promise<CaptureBrowse | null> => {
  const capturedDate = new Date()
  const result = await TesseractService.shared().recognize(img)
  console.debug('ocr result : ', result)
  const { data: { blocks } } = result

  if (!blocks)
    return null

  const paragraphs = blocks.reduce((acc: Paragraph[], block) => {
    if (ignoreBlockTypes.includes(block.blocktype) || block.confidence < thresholdConfidence)
      return acc

    const ps = block.paragraphs
      ?.filter(p => p.text.trim().length > 0 && p.confidence >= thresholdConfidence)
      .map((p) => {
        return {
          text: p.text.replace(/(?<![a-z])\s+(?![a-z])/gm, ''),
          confidence: p.confidence,
        }
      }) ?? []
    return acc.concat(ps)
  }, [])

  return {
    img,
    datetime: capturedDate,
    document: {
      title: document.title,
      url: document.URL,
    },
    paragraphs,
  }
}
