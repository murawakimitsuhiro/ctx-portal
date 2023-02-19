/* eslint-disable no-console */
import { sendMessage } from 'webext-bridge'
import { MessageType } from '~/pkg/const/message'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  // communication example: send previous tab title from background page
  // onMessage('tab-prev', ({ data }) => {
  //   console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  // })
  // sendMessage('tab-prev', { title: tab.title }, { context: 'content-script', tabId }

  sendMessage(MessageType.UserActivity, { data: 'test' })
    .then(vale => {
      console.debug(vale)
    })
    .catch(err => {
      console.debug('sendMessage error')
      console.error(err)
    })

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
