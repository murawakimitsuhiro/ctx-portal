import type { Runtime } from 'webextension-polyfill'
import browser from 'webextension-polyfill'
import { dummyContext } from '~/pkg/const/dummydata'
import type { UserBrowseLog } from '~/pkg/entity/capture-log'

export class NativeAppService {
  private static instance: NativeAppService
  private port: Runtime.Port

  private constructor() {
    this.port = browser.runtime.connectNative('dev.mrwk.ctx_portal')

    // ローカルアプリからメッセージ受信
    this.port.onMessage.addListener((req) => {
      if (browser.runtime.lastError)
        // eslint-disable-next-line no-console
        console.debug(browser.runtime.lastError.message)
      this.handleMessage(req)
    })

    // アプリから切断されたときの処理
    this.port.onDisconnect.addListener(() => {
      if (browser.runtime.lastError)
        // eslint-disable-next-line no-console
        console.debug(browser.runtime.lastError.message)

      // eslint-disable-next-line no-console
      console.debug('Disconnected')
    })
  }

  static shared(): NativeAppService {
    if (!NativeAppService.instance)
      NativeAppService.instance = new NativeAppService()
    return NativeAppService.instance
  }

  private handleMessage(req: any) {
    console.debug('receive native message : ', req)
  }

  private sendMessage(messageType: string, data: any) {
    // ローカルアプリへメッセージ送信
    console.debug('send native message : ', messageType, data)
    this.port.postMessage({ type: messageType, data })
  }

  public registerHandler(messageType: string, handler: (data: any) => void) {
    this.port.onMessage.addListener((req) => {
      if (req.type === messageType) {
        handler(req.data)
      }
    })
  }

  public sendUserActivity(data: UserBrowseLog) {
    this.sendMessage('user-activity', data)
  }

  public sendSearchContext(context: string = dummyContext) {
    this.sendMessage('search-context', { context })
  }
}
