import { sendMessage } from 'webext-bridge'
import App from './views/App.vue'
import { MessageType } from '~/pkg/const/message'

(() => {
  mountVue()

  const openedTime = new Date()
  setTimeout(() => {
    addEventListener('wheel', (_) => {
      const elapsed = (new Date()).valueOf() - openedTime.valueOf()
      // 30秒以上滞在していない時には記録しない
      if (elapsed < 30 * 1000)
        return

      sendMessage(MessageType.UserActivity, { title: document.title, url: document.URL }).then()
    }, { passive: true })
  }, 15 * 1000)
})()

function mountVue() {
  const container = document.createElement('div')
  const root = document.createElement('div')
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  document.body.appendChild(container)
  const app = createApp(App)
  // setupApp(app)
  app.mount(root)
}


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
