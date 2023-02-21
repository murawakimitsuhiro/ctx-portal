import type { ProtocolWithReturn } from 'webext-bridge'
import { CaptureBrowse } from '~/pkg/entity/capture-log'

export const MessageType = {
  UserActivity: 'user-activity',
  CaptureBrowse: 'capture-browse',
} as const

export interface MessageDataType {
  [MessageType.UserActivity]: ProtocolWithReturn<{ action: string }, { img: string; timestamp: Date } | null>
  [MessageType.CaptureBrowse]: CaptureBrowse
}
