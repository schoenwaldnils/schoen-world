import { GetStaticProps, GetStaticPropsResult } from 'next'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import { FC } from 'react'

import { IPost } from '../../@types/generated/contentful'
import { Article } from '../../components/Article'
import { Page } from '../../components/Page'
import mock from '../../data/postMock.json'

const ArticleNews: FC<{ post?: IPost }> = ({ post }) => (
  <>
    <NextSeo
      noindex
      nofollow
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
            url: post.fields.image.fields.file.url,
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
  preview = false,
}): Promise<
  GetStaticPropsResult<{
    preview: boolean
    post?: IPost
  }>
> => {
  const post = mock as unknown as IPost

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
