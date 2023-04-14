import { UUID } from '~/pkg/entity/basic'

const baseUrl = 'https://scrapbox.io/api/pages/'

export interface ScrapboxPage {
  id: UUID
  title: string
  texts: string
  image: string | null
  url: string
  links: [string: ScrapboxPage[]]
  isSelected: boolean
}

export function getRelation(url: URL) {
  // const url = new URL('https://scrapbox.io/murawaki/Enhancing_User_Behavior_Sequence_Modeling_by_Tasks_(2022)')
  const [_, projectName, pageTitle] = url.pathname.split('/')
  console.debug('project name', projectName, pageTitle)

  return fetch(`${baseUrl}${projectName}/${pageTitle}`)
    .then(res => res.json())
    .then(json => toScrapboxPage(json, projectName))
}

function toScrapboxPage(json: any, projectName: string): ScrapboxPage {
  const links: [string: ScrapboxPage[]] = {}

  if (Object.hasOwn(json, 'relatedPages')) {
    console.debug('json', json)
    // add 1hops
    json.relatedPages.links1hop.map((p: any) => {
      const relationLabel = p.linksLc[0]
      if (relationLabel in links)
        links[relationLabel].push(toScrapboxPage(p, projectName))
      else
        links[relationLabel] = [toScrapboxPage(p, projectName)]
    })
    // add 2hops
    json.relatedPages.links2hop.map((p: any) => {
      const relationLabel = p.linksLc[0]
      if (relationLabel in links)
        links[relationLabel].push(toScrapboxPage(p, projectName))
      else
        links[relationLabel] = [toScrapboxPage(p, projectName)]
    })

    // external link
    if (Object.hasOwn(json.relatedPages, 'projectLinks1hop')) {
      if (json.relatedPages.projectLinks1hop.length > 0)
        links['Related'] = json.relatedPages.projectLinks1hop.map((p: any) => toScrapboxPage(p, p.projectName))
    }
  }

  return {
    id: json.id,
    title: json.title,
    url: `https://scrapbox.io/${projectName}/${json.title.replaceAll(' ', '_')}`,
    texts: json.descriptions.map(s => s.replace(/[\[\]]/g, '')).join(' '),
    image: json.image ?? null,
    links,
  }
}
