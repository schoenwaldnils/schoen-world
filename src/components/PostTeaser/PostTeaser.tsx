import styled from '@emotion/styled'
import Paper from '@material-ui/core/Paper'
import Link from 'next/link'
import { FC } from 'react'

import { IPostFields } from '../../@types/generated/contentful'
import { Image } from '../Image'
import { h4Styles } from '../Typography'

const TeaserContainer = styled.a`
  cursor: pointer;
`

const StyledPaper = styled.div`
  height: 100%;
  overflow: hidden;

  color: var(--PostTeaser-color) !important;
  background-color: var(--PostTeaser-background) !important;
`

const ImageWrapper = styled.div`
  > div {
    display: block !important;
  }
`

const Title = styled.h1`
  ${h4Styles}
  margin-bottom: 0.5em;
`

const Excerpt = styled.div`
  padding: 1rem;
`

export const PostTeaser: FC<IPostFields> = ({
  title,
  image,
  description,
  slug,
}) => {
  const file = image?.fields?.file

  return (
    <Link href={`/blog/${slug}`}>
      <TeaserContainer>
        <Paper component={StyledPaper} elevation={2}>
          {file.url && (
            <ImageWrapper>
              <Image
                src={file.url}
                alt={title}
                width={file.details.image.width}
                height={file.details.image.width / 2.5}
                objectFit="cover"
                objectPosition="center"
              />
            </ImageWrapper>
          )}

          <Excerpt>
            <Title>{title}</Title>
            <p>{description}</p>
          </Excerpt>
        </Paper>
      </TeaserContainer>
    </Link>
  )
}
