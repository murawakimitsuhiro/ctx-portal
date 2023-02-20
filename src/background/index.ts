import browser from 'webextension-polyfill'
import { onMessage } from 'webext-bridge'
import { captureVisibleIfTabActive } from '~/logic'
import { MessageType } from '~/pkg/const/message'
import { Supabase } from '~/pkg/service/supabase'

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')

  const vars = Object(process.env.VITE)
  Supabase.shared().setVariables(vars.VITE_SUPABASE_API_URL, vars.VITE_SUPABASE_KEY)
  Supabase.shared().client?.from('countries').select()
    .then(({ data, error }) => {
      if (error) throw error
      console.debug('supabase data ', data)
    })
})

onMessage(MessageType.UserActivity, async ({ sender }) => {
  const img = await captureVisibleIfTabActive(sender.tabId)
    .catch(err => console.error('captureCurrentTab error', err))
  return { capturedImg: img ?? null }
})
