export interface BrowseDocument {
  title: string
  url: string
}

export interface UserBrowseLog {
  img: string
  timestamp: Date
  document: BrowseDocument
}
