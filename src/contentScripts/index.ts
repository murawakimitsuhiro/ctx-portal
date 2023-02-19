/* eslint-disable no-console */
import { sendMessage } from 'webext-bridge'
import { MessageType } from '~/pkg/const/message'

(() => {
  sendMessage(MessageType.UserActivity, { action: 'test' })
    .then((vale) => {
      console.debug(vale)
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
