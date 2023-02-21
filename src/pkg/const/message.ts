import type { ProtocolWithReturn } from 'webext-bridge'
import type { BrowseDocument, CaptureBrowse } from '~/pkg/entity/capture-log'

export const MessageType = {
  UserActivity: 'user-activity',
  CaptureBrowse: 'capture-browse',
} as const

export interface MessageDataType {
  [MessageType.UserActivity]: ProtocolWithReturn<BrowseDocument, { document: BrowseDocument; img: string; timestamp: Date } | null>
  [MessageType.CaptureBrowse]: CaptureBrowse
}
