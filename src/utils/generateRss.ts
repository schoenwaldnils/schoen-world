import fs from 'fs'
import RSS from 'rss'

import { IPost } from '../@types/generated/contentful'
import { seo } from '../data/seo'

export const generateRss = async (posts: IPost[]): Promise<void> => {
  /* lets create an rss feed */
  const feed = new RSS({
    title: seo.title,
    description: seo.description,
    feed_url: `${seo.url}/rss.xml`,
    site_url: seo.url,
    image_url: seo.images.w200,
    managingEditor: seo.owner,
    webMaster: seo.owner,
    copyright: `${new Date().getFullYear()} ${seo.owner}`,
    language: 'en',
    categories: ['css', 'react', 'web development'],
    pubDate: new Date('June 24, 2014 17:39:00'),
    ttl: 60,
  })

  posts.forEach((post) => {
    const { fields } = post

    feed.item({
      title: fields.title,
      description: fields.description,
      url: `${seo.url}/blog/${fields.slug}`, // link to the item
      categories: fields.tags, // optional - array of item categories
      author: fields.author.fields.name, // optional - defaults to feed author property
      date: new Date(fields.date), // any format that js Date can parse.
      enclosure: {
        url: fields.image?.fields?.file?.url,
        size: fields.image?.fields?.file.details.size,
        type: fields.image?.fields?.file.contentType,
      },
    })
  })

  // cache the xml to send to clients
  const xml = feed.xml({
    indent: '  ',
  })

  fs.writeFileSync('./public/rss.xml', xml)
}
