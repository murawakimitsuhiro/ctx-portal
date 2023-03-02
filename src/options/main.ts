import { createApp } from 'vue'
import { onMessage } from 'webext-bridge'
import { InnerMessageType } from '~/pkg/const/message'
import App from './Options.vue'
import '../styles'

const app = createApp(App)
app.mount('#app')
