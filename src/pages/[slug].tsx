import {
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next'
import { NextSeo } from 'next-seo'
import { FC } from 'react'

import { IPage } from '../@types/generated/contentful'
import { Article } from '../components/Article'
import { Page } from '../components/Page'
import { getEntryCollection, getPageBySlug } from '../utils/contentful'

const ArticleNews: FC<{ page?: IPage }> = ({ page }) => {
  if (page) {
    return (
      <>
        <NextSeo
          title={page.fields.title}
          description={page.fields.description}
        />

        <Page>
          <Article {...page.fields} type="page" />
        </Page>
      </>
    )
  }
}

export default ArticleNews

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}): Promise<
  GetStaticPropsResult<{
    preview: boolean
    page?: IPage
  }>
> => {
  const page = (await getPageBySlug(params.slug as string, preview)) as IPage

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      preview,
      page,
    },
  }
}

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const allPages = await getEntryCollection('page')

  const excludeSlugs = ['/404']

  const pagePaths = allPages
    ?.map(({ fields: { slug } }) => `/${slug}`)
    .filter((i) => !excludeSlugs.includes(i))

  return {
    paths: pagePaths,
    fallback: false,
  }
}
