import type { BrowseDocument, UserBrowseLog } from '~/pkg/entity/capture-log'

export const MessageType = {
  UserActivity: 'user-activity',
  CaptureBrowse: 'capture-browse',
} as const

export interface MessageDataType {
  [MessageType.UserActivity]: BrowseDocument
  [MessageType.CaptureBrowse]: UserBrowseLog
}
