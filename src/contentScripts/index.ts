import { sendMessage } from 'webext-bridge'
import { OCRBroseImage } from '~/logic'
import { MessageType } from '~/pkg/const/message'
import type { BrowseDocument, CaptureBrowse } from '~/pkg/entity/capture-log'

(() => {
  setInterval(() => {
    sendMessage(MessageType.UserActivity, { title: document.title, url: document.URL })
      .then((captureResult) => {
        if (captureResult)
          return loggingByCapturedImage(captureResult.document, captureResult.img, captureResult.timestamp)
      })
      .catch(err => console.error('sendMessage: UserActivity error', err))
  }, 2 * 1000)
})()

async function loggingByCapturedImage(document: BrowseDocument, img: string, timestamp: Date) {
  // const captured = await OCRBroseImage(img)
  // if (captured)
  //   await sendMessage(MessageType.CaptureBrowse, captured)
  const captureDummy: CaptureBrowse = {
    img,
    document,
    datetime: timestamp,
    paragraphs: [],
  }
  await sendMessage(MessageType.CaptureBrowse, captureDummy)
}
