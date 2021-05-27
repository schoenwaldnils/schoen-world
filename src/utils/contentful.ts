import * as contentful from 'contentful'

import { CONTENT_TYPE, IPage, IPost } from '../@types/generated/contentful.d'

export const contentfulClient = (
  preview = false,
  secret = undefined,
): contentful.ContentfulClientApi => {
  let token = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

  if (secret) {
    token = secret
  }

  return contentful.createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: token,
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  })
}

// prettier-ignore
type ObjectType<T> =
  T extends 'page' ? IPage[] :
  T extends 'post' ? IPost[] :
  never

export const getEntryCollection = async <T extends CONTENT_TYPE>(
  type: T,
  preview = false,
  order?: string,
): Promise<ObjectType<T>> => {
  const collection = await contentfulClient(preview).getEntries({
    content_type: type,
    include: 10,
    order,
  })

  return collection.items as unknown as ObjectType<typeof type>
}

export const getEntryById = async (
  id: string,
  preview = false,
  secret = undefined,
): Promise<unknown> => {
  const res = await contentfulClient(preview, secret)
    .getEntries({
      'sys.id': id,
      include: 10,
    })
    .catch((err) => {
      console.error(err)
      throw new Error(err)
    })

  return res.items[0]
}

export const getPageBySlug = async (
  slug: string,
  preview = false,
): Promise<IPage> => {
  const res = await contentfulClient(preview)
    .getEntries({
      include: 10,
      content_type: 'page',
      'fields.slug': slug,
    })
    .catch((err) => {
      console.error(err)
      throw new Error(err)
    })

  if (!res.items.length) {
    return null
  }

  return res.items[0] as unknown as IPage
}

export const getPostBySlug = async (
  slug: string,
  preview = false,
): Promise<IPost> => {
  const res = await contentfulClient(preview)
    .getEntries({
      include: 10,
      content_type: 'post',
      'fields.slug': slug,
    })
    .catch((err) => {
      console.error(err)
      throw new Error(err)
    })

  if (!res.items.length) {
    return null
  }

  return res.items[0] as unknown as IPost
}
