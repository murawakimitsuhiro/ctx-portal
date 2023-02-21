import { sendMessage } from 'webext-bridge'
import { OCRBroseImage } from '~/logic'
import { MessageType } from '~/pkg/const/message'
import type { CaptureBrowse } from '~/pkg/entity/capture-log'

(() => {
  setInterval(() => {
    sendMessage(MessageType.UserActivity, { action: 'test' })
      .then((captureResult) => {
        if (captureResult)
          return loggingByCapturedImage(captureResult.img, captureResult.timestamp)
      })
      .catch(err => console.error('sendMessage: UserActivity error', err))
  }, 2 * 1000)
})()

async function loggingByCapturedImage(img: string, timestamp: Date) {
  // const captured = await OCRBroseImage(img)
  // if (captured)
  //   await sendMessage(MessageType.CaptureBrowse, captured)
  const captureDummy: CaptureBrowse = {
    img,
    datetime: timestamp,
    document: {
      title: document.title,
      url: document.URL,
    },
    paragraphs: [],
  }
  await sendMessage(MessageType.CaptureBrowse, captureDummy)
}
