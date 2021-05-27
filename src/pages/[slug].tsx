import {
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next'
import { NextSeo } from 'next-seo'
import { FC } from 'react'

import { IPage, IPost } from '../@types/generated/contentful'
import { Article } from '../components/Article'
import { Page } from '../components/Page'
import {
  getEntryCollection,
  getPageBySlug,
  getPostBySlug,
} from '../utils/contentful'

const ArticleNews: FC<{ page?: IPost; post?: IPost }> = ({ page, post }) => {
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
  if (post) {
    return (
      <>
        <NextSeo
          title={post.fields.title}
          description={post.fields.description}
          openGraph={{
            type: 'article',
            article: {
              publishedTime: `${post.fields.date}Z`,
            },
            images: [
              {
                url: post.fields.image.fields.file.url,
                width: 1200,
                height: 630,
              },
            ],
          }}
        />

        <Page>
          <Article {...post.fields} />
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
    post?: IPost
  }>
> => {
  const page = (await getPageBySlug(params.slug as string, preview)) as IPage
  const post = (await getPostBySlug(params.slug as string, preview)) as IPost

  if (!page && !post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      preview,
      page,
      post,
    },
  }
}

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const allPosts = await getEntryCollection('post')
  const allPages = await getEntryCollection('page')
  return {
    paths: [
      ...(allPosts?.map(({ fields: { slug } }) => `/${slug}`) ?? []),
      ...(allPages?.map(({ fields: { slug } }) => `/${slug}`) ?? []),
    ],
    fallback: false,
  }
}
