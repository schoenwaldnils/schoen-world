import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

import { OgImage } from '@/components/OgImage'
import { ContentItem, getNote, getPage } from '@/utils/content'

const getOGData = async (
  type: string,
  slug: string,
): Promise<ContentItem | null> => {
  if (type === 'page') {
    return await getPage(slug)
  } else if (type === 'til') {
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

  if (!title || (type && !slug)) {
    return new Response('Bad Request', { status: 400 })
  }

  const ogData = (type && slug && (await getOGData(type, slug))) || null

  if (!title && !ogData) {
    return new Response('Not found', { status: 404 })
  }

  return new ImageResponse(
    (
      <div tw="text-white bg-[#131111] w-full h-full flex items-center justify-center p-16">
        <OgImage
          title={title || ogData?.metadata.title}
          description={description || ogData?.metadata.description}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
