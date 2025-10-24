import { default as RSS } from 'rss'

import { getNotes } from '@/utils/content'

export const GET = () => {
  const notes = getNotes()

  const feedOptions: RSS.FeedOptions = {
    title: 'Schönwald',
    description: 'Thoughts on CSS, JS, and overall clean code.',
    site_url: 'https://schoen.world',
    feed_url: 'https://schoen.world/rss.xml',
    image_url: 'https://schoen.world/images/icon-on-black.png',
    managingEditor: 'Nils Schönwald',
    webMaster: 'Nils Schönwald',
    copyright: `${new Date().getFullYear()} Nils Schönwald`,
    language: 'en',
    categories: ['css', 'javascript', 'typescript', 'web development', 'notes'],
    pubDate: new Date(),
    ttl: 60 * 12, // 12 hours
  }

  const feed = new RSS(feedOptions)

  notes.forEach((post) => {
    const {
      metadata: { title, description, publishedAt },
      slug,
    } = post

    if (!description) {
      throw new Error('Description is required for RSS feed')
    }

    if (!publishedAt) {
      throw new Error('Published at is required for RSS feed')
    }

    feed.item({
      title,
      description,
      url: `https://schoen.world/n/${slug}`,
      author: 'Nils Schönwald',
      date: publishedAt,
    })
  })

  const rssXml = feed.xml({ indent: true })

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
