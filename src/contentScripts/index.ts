import { sendMessage } from 'webext-bridge'
import { MessageType } from '~/pkg/const/message'

(() => {
  const openedTime = new Date()
  addEventListener('scroll', (_) => {
    const elapsed = (new Date()).valueOf() - openedTime.valueOf()
    // 30秒以上滞在していない時には記録しない
    if (elapsed < 30 * 1000)
      return

    sendMessage(MessageType.UserActivity, { title: document.title, url: document.URL }).then()
  }, { passive: true })
})()

// OCRをjs側で行う場合
// async function loggingByCapturedImage(document: BrowseDocument, img: string, timestamp: Date) {
//   const ocrParagraphs = await OCRBroseImage(img)
//   if (!ocrParagraphs)
//     return

//   const captureDummy: UserBrowseLog = {
//     img,
//     document,
//     timestamp: timestamp,
//     paragraphs: [],
//   }
//   await sendMessage(MessageType.CaptureBrowse, captureDummy)
// }
