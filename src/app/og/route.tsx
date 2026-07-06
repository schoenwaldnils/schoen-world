import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

import { OgImage } from '@/components/OgImage'
import { compressArrayBuffer } from '@/utils/compressArrayBuffer'
import { ContentItem, getNote, getPage } from '@/utils/content'

const getOGData = async (
  type: string,
  slug: string | string[],
): Promise<ContentItem | null> => {
  if (type === 'page' && Array.isArray(slug)) {
    return await getPage(slug)
  } else if (type === 'n' && typeof slug === 'string') {
    return await getNote(slug)
  }

  return null
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const title = searchParams.get('title')
  const description = searchParams.get('description')
  const type = searchParams.get('type')
  const slug = searchParams.get('slug')

  if (type && !slug) {
    return new Response('Bad Request', { status: 400 })
  }

  const ogData = (type && slug && (await getOGData(type, slug))) || null

  if (!title && !ogData) {
    return new Response('Not found', { status: 404 })
  }

  const ralewayVariableFont = await readFile(
    join(process.cwd(), 'src/app/fonts/Raleway/static/Raleway-Bold.ttf'),
  )
  const robotoFont = await readFile(
    join(process.cwd(), 'src/app/fonts/Roboto/static/Roboto-Regular.ttf'),
  )

  const imageResponse = new ImageResponse(
    <OgImage
      title={title || ogData?.metadata.title}
      description={description || ogData?.metadata.description}
    />,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Raleway',
          data: ralewayVariableFont,
          style: 'normal',
        },
        {
          name: 'Roboto',
          data: robotoFont,
          style: 'normal',
        },
      ],
    },
  )

  // thanks to @carlos-dubon
  // https://github.com/vercel/next.js/discussions/60366#discussioncomment-11997246
  const arrayBuffer = await imageResponse.arrayBuffer()
  const compressedImage = await compressArrayBuffer(arrayBuffer)

  const headers = new Headers()
  headers.set('Content-Type', 'image/jpeg')
  // the Cache-Control header was set in the ImageResponse so I copied it here
  headers.set(
    'Cache-Control',
    'public, immutable, no-transform, max-age=604800', // 1 week
  )
  return new Response(compressedImage, {
    status: 200,
    statusText: 'OK',
    headers,
  })
}
