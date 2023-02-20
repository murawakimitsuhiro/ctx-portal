import browser from 'webextension-polyfill'
import { onMessage } from 'webext-bridge'
import { captureVisibleIfTabActive } from '~/logic'
import { MessageType } from '~/pkg/const/message'
import { Supabase } from '~/pkg/service/supabase'
import { VARIABLES } from '~/variables'

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')

  console.debug(process.env.VITE)
  console.debug(process.env.NODE_ENV)

  const vars = JSON.parse(process.env.VITE ?? '{}')
  Supabase.shared().setVariables(vars.VITE_SUPABASE_API_URL, vars.VITE_SUPABASE_KEY)
  Supabase.shared().client?.from('countries').select()
    .then(({ data, error }) => {
      if (error) throw error
      console.debug('supabase data ', data)
    })

  // import('~/variables').then(({ VARIABLES }) => {
  //   console.debug('VARIABLES ', VARIABLES)
  // })
})

onMessage(MessageType.UserActivity, async ({ sender }) => {
  const img = await captureVisibleIfTabActive(sender.tabId)
    .catch(err => console.error('captureCurrentTab error', err))
  return { capturedImg: img ?? null }
})
