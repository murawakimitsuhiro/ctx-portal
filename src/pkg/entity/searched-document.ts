import type { UUID } from '~/pkg/entity/basic'

export interface SearchedDocument {
  id: UUID
  title: string
  url: string
  texts: string
}
