import styled from '@emotion/styled'
import Paper from '@material-ui/core/Paper'
import Link from 'next/link'
import { FC } from 'react'

import { IPostFields } from '../../@types/generated/contentful'
import { aspectRatio } from '../../utils/mixins'
import { Image } from '../Image'
import { h4Styles } from '../Typography'

const TeaserContainer = styled.a`
  cursor: pointer;

  &,
  &:hover,
  &:visited {
    color: inherit;
    text-decoration: none;
  }
`

const StyledPaper = styled.div`
  height: 100%;
  overflow: hidden;

  color: var(--PostTeaser-color) !important;
  background-color: var(--PostTeaser-background) !important;
`

const ImageWrapper = styled.div`
  ${aspectRatio(2.5)}
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
    <Link href={`/blog/${slug}`} passHref>
      <TeaserContainer>
        <Paper component={StyledPaper} elevation={2}>
          {file.url && (
            <ImageWrapper>
              <Image
                src={file.url}
                alt={title}
                layout="fill"
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
