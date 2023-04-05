// import type { ProtocolWithReturn } from 'webext-bridge'
import type { BackgroundState } from '~/background'
import type { BrowseDocument, UserBrowseLog } from '~/pkg/entity/capture-log'

export const InnerMessageType = {
  UserActivity: 'user-activity',
  CaptureBrowse: 'capture-browse',
  GetBackgroundState: 'get-background-state',
  UpdateBackgroundState: 'update-background-state',
  OnOpenSearchModal: 'on-open-search-modal',
} as const

export interface MessageDataType {
  [InnerMessageType.UserActivity]: BrowseDocument
  [InnerMessageType.CaptureBrowse]: UserBrowseLog
  [InnerMessageType.GetBackgroundState]: {}
  [InnerMessageType.UpdateBackgroundState]: BackgroundState
  [InnerMessageType.OnOpenSearchModal]: BackgroundState
}

export const NativeMessageType = {
  send: {
    UserActivity: 'user-activity',
    SearchContext: 'search-context',
  },
  receive: {
    SearchContext: 'search-context',
  },
}
