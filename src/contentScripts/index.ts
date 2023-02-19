/* eslint-disable no-console */
import { sendMessage } from 'webext-bridge'
import { capturedLog } from '~/logic';
import { MessageType } from '~/pkg/const/message'
import TesseractService from '~/pkg/service/ocr';

(() => {
  sendMessage(MessageType.UserActivity, { action: 'test' })
    .then(({ capturedImg }) => {
      if (capturedImg)
        return loggingByCapturedImage(capturedImg)
    })
    .catch(err => console.error('sendMessage: UserActivity error', err))

  // mount component to context window
  // const container = document.createElement('div')
  // const root = document.createElement('div')
  // const styleEl = document.createElement('link')
  // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  // styleEl.setAttribute('rel', 'stylesheet')
  // styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  // shadowDOM.appendChild(styleEl)
  // shadowDOM.appendChild(root)
  // document.body.appendChild(container)
  // createApp(App).mount(root)
})()

async function loggingByCapturedImage(img: string) {
  // const { data: { lines, text, words, symbols } } = await TesseractService.shared().recognize(img)
  const { data: { text } } = await TesseractService.shared().recognize(img)

  capturedLog.value = {
    img,
    url: document.URL,
    title: document.title,
    datetime: new Date(),
    displayText: text,
    inputText: '',
  }
}
