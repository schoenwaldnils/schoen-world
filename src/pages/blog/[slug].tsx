import {
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next'
import { ArticleJsonLd, NextSeo } from 'next-seo'
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
          modifiedTime: `${post.sys.updatedAt}Z`,
        },
        images: [
          {
            url: `https://${post.fields.image.fields.file.url}?w=1200&h=630&fit=fill`,
            width: 1200,
            height: 630,
          },
        ],
      }}
    />
    <ArticleJsonLd
      url="https://example.com/article"
      title={post.fields.title}
      description={post.fields.description}
      images={[post.fields.image.fields.file.url]}
      datePublished={`${post.fields.date}Z`}
      dateModified={`${post.sys.updatedAt}Z`}
      authorName={[post.fields.author.fields.name]}
      publisherName="Schönwald"
      publisherLogo="https://schoen.world/images/icon-on-black.png"
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
    paths: allPosts?.map(({ fields: { slug } }) => `/blog/${slug}`) ?? [],
    fallback: false,
  }
}
