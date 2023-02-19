import type { ProtocolWithReturn } from 'webext-bridge'
import { MessageDataType } from '~/pkg/const/message';

declare module 'webext-bridge' {
  export interface ProtocolMap extends MessageDataType {
    // define message protocol types
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    // 'tab-prev': { title: string | undefined }
    // 'get-current-tab': ProtocolWithReturn<{ tabId: number }, { title?: string }>
  }
}
