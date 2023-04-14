import type { UUID } from '~/pkg/entity/basic'

export interface SearchedDocument {
  id: UUID
  title: string
  url: string
  texts: string
  isSelected: Boolean
}

export function decodedUrl(document: SearchedDocument): string {
  const decoded = decodeURIComponent(document.url)
  // const url = decoded.match(/^(?:https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
  return decoded.replace(/^https?:\/\//, '') ?? decoded
}

export function isPdf(document: SearchedDocument): boolean {
  const url = new URL(document.url)
  return url.pathname.includes('mrwk-space') || url.hostname.includes('drive.google.com')
}
