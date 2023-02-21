/* eslint-disable no-console */
import { sendMessage } from 'webext-bridge'
import { OCRBroseImage } from '~/logic'
import { MessageType } from '~/pkg/const/message'
import { CaptureBrowse } from '~/pkg/entity/capture-log'

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
    datetime: new Date(),
    document: {
      title: document.title,
      url: document.URL,
    },
    paragraphs: ['hello', 'hogehoge'],
  }
  await sendMessage(MessageType.CaptureBrowse, captureDummy)
}
