export const MessageType = {
  UserActivity: 'user-activity',
} as const

export interface MessageDataType {
  [MessageType.UserActivity]: { action: string }
}
