import type { UUID } from '~/pkg/entity/basic'
import type { Paragraph } from '~/pkg/entity/paragraph'

export interface BrowseParagraphLog {
  id: UUID
  datetime: Date
  document_title: string
  document_url: string
  document_latest_capture_image_url: string
  paragraphs: Paragraph[]
}
