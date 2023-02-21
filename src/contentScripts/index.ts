import { sendMessage } from 'webext-bridge'
import { OCRBroseImage } from '~/logic'
import { MessageType } from '~/pkg/const/message'
import type { BrowseDocument, CaptureBrowse } from '~/pkg/entity/capture-log'

(() => {
  const openedTime = new Date()
  // setInterval(() => {
  //   sendMessage(MessageType.UserActivity, { title: document.title, url: document.URL })
  //     .then((captureResult) => {
  //       if (captureResult)
  //         return loggingByCapturedImage(captureResult.document, captureResult.img, captureResult.timestamp)
  //     })
  //     .catch(err => console.error('sendMessage: UserActivity error', err))
  // }, 10 * 1000)
  addEventListener('scroll', (_) => {
    const elapsed = (new Date()).valueOf() - openedTime.valueOf()
    // 30秒以上滞在していない時には記録しない
    if (elapsed < 30 * 1000)
      return

    sendMessage(MessageType.UserActivity, { title: document.title, url: document.URL })
      .then((captureResult) => {
        if (captureResult)
          console.debug('returned capture img', captureResult)
        //   return loggingByCapturedImage(captureResult.document, captureResult.img, captureResult.timestamp)
      })
      .catch(err => console.error('sendMessage: UserActivity error', err))
  }, { passive: true })
})()

async function loggingByCapturedImage(document: BrowseDocument, img: string, timestamp: Date) {
  const ocrParagraphs = await OCRBroseImage(img)
  if (!ocrParagraphs)
    return

  const captureDummy: CaptureBrowse = {
    img,
    document,
    datetime: timestamp,
    paragraphs: ocrParagraphs,
  }
  await sendMessage(MessageType.CaptureBrowse, captureDummy)
}
