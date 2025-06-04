import { default as RSS } from 'rss'

import { getTilPostsMetadata } from '@/lib/utils/content'

export function GET() {
  const tilPosts = getTilPostsMetadata()

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
    categories: ['css', 'javascript', 'typescript', 'web development', 'til'],
    pubDate: new Date(),
    ttl: 60 * 12, // 12 hours
  }

  const feed = new RSS(feedOptions)

  tilPosts.forEach((post) => {
    feed.item({
      title: post.metadata.title,
      description: post.metadata.description,
      url: `https://schoen.world/til/${post.slug}`,
      author: 'Nils Schönwald',
      date: post.metadata.publishedAt,
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
