import type { UUID } from '~/pkg/entity/basic'

export interface Paragraph {
  id: UUID
  created_at: Date
  text: string
  document_id: UUID
}
