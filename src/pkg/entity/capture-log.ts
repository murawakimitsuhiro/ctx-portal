export interface BrowseDocument {
  title: string
  url: string
}

export interface Paragraph {
  text: string
  confidence: number
}

export interface CaptureBrowse {
  img: string
  datetime: Date
  document: BrowseDocument
  paragraphs: Paragraph[]
}
