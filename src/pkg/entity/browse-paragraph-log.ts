import type { Base64, UUID } from '~/pkg/entity/basic'
import type { Paragraph } from '~/pkg/entity/paragraph'

export interface BrowseParagraphLog {
  id: UUID
  datetime: Date
  capture_img: Base64
  document_title: string
  document_url: string
  paragraphs: Paragraph[]
}
