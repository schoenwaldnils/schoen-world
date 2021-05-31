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
`

const StyledPaper = styled.div`
  height: 100%;
  overflow: hidden;

  color: var(--PostTeaser-color) !important;
  background-color: var(--PostTeaser-background) !important;
`

const ImageWrapper = styled.div`
  ${aspectRatio(2.5)}

  object-position: center;
`

const Excerpt = styled.div`
  padding: 1rem;
`

const Title = styled.h1`
  ${h4Styles}
  margin-bottom: 0.5em;
`

export const PostTeaser: FC<IPostFields> = ({
  title,
  image,
  description,
  slug,
}) => {
  const imgSrc = image?.fields?.file?.url

  return (
    <Link href={`/blog/${slug}`}>
      <TeaserContainer>
        <Paper component={StyledPaper} elevation={2}>
          {imgSrc && (
            <ImageWrapper>
              <Image src={imgSrc} alt={title} />
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
