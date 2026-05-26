import type { MetadataRoute } from 'next'

import { getAllContent } from './utils/content'
import { getServerSideURL } from './utils/getBaseURL'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = getServerSideURL()
  const allContent = await getAllContent()

  return allContent.map((item) => {
    const lastModified =
      (item.metadata as { modifiedAt?: string }).modifiedAt ||
      item.metadata.updatedAt ||
      item.metadata.publishedAt

    const urlPath =
      item.path.length === 1 && item.path[0] === 'home'
        ? ''
        : `/${item.path.join('/')}`

    return {
      url: `${baseURL}${urlPath}`,
      lastModified: lastModified
        ? new Date(lastModified).toISOString()
        : undefined,
      changeFrequency: item.type === 'note' ? 'monthly' : 'yearly',
      priority: item.type === 'page' && urlPath === '' ? 1 : 0.7,
    }
  })
}
