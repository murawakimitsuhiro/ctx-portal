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

export async function openUrl(document: SearchedDocument): Promise<string> {
  const url = new URL(document.url)
  if (!isPdf(document) || url.hostname.includes('drive.google.com'))
    return document.url

  if (url.pathname.includes('mrwk-space')) {
    const res = await fetch(`${document.url.replace('scrapbox.io', 'scrapbox.io/api/code')}/meta.json`)
    if (!res.ok)
      return 'https://scrapbox.io/mrwk-space/'
    const meta = await res.json()
    return `https://drive.google.com/open?id=${meta.id}`
  }
}

