export interface Document {
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
  document: Document
  paragraphs: Paragraph[]
}
