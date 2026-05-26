import type { MetadataRoute } from 'next'

import { getServerSideURL } from './utils/getBaseURL'

export default function robots(): MetadataRoute.Robots {
  const baseURL = getServerSideURL()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/og', '/api/'],
    },
    sitemap: `${baseURL}/sitemap.xml`,
    host: baseURL,
  }
}
