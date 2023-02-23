export interface BrowseDocument {
  title: string
  url: string
}

export interface Paragraph {
  text: string
  confidence: number
}

export interface CaptureActivity {
  img: string
  timestamp: Date
  document: BrowseDocument
}

export interface UserBrowseLog {
  img: string
  timestamp: Date
  document: BrowseDocument
  paragraphs: Paragraph[]
}
