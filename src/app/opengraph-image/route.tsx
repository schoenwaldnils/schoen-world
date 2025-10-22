import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

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
  } else if (type === 'n') {
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

  return new ImageResponse(
    (
      <OgImage
        title={title || ogData?.metadata.title}
        description={description || ogData?.metadata.description}
      />
    ),
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
}
