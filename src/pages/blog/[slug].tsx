import {
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next'
import { NextSeo } from 'next-seo'
import { FC } from 'react'

import { IPost } from '../../@types/generated/contentful'
import { Article } from '../../components/Article'
import { Page } from '../../components/Page'
import { getEntryCollection, getPostBySlug } from '../../utils/contentful'

const ArticleNews: FC<{ post?: IPost }> = ({ post }) => (
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

export default ArticleNews

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}): Promise<
  GetStaticPropsResult<{
    preview: boolean
    post?: IPost
  }>
> => {
  const post = (await getPostBySlug(params.slug as string, preview)) as IPost

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      preview,
      post,
    },
  }
}

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const allPosts = await getEntryCollection('post')
  return {
    paths: allPosts?.map(({ fields: { slug } }) => `/${slug}`) ?? [],
    fallback: false,
  }
}
