import type { ProtocolWithReturn } from 'webext-bridge'

export const MessageType = {
  UserActivity: 'user-activity',
} as const

export interface MessageDataType {
  [MessageType.UserActivity]: ProtocolWithReturn<{ action: string }, { capturedImg: string | null }>
}
