import styled from '@emotion/styled'
import { FC } from 'react'
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'

import { IPostFields } from '../../@types/generated/contentful'
import { aspectRatio, maxWidthText, upFromBreakpoint } from '../../utils/mixins'
import { Author } from '../Author'
import { GiscusComments } from '../GiscusComments'
import { Image } from '../Image'
import { RichText } from '../RichText'
import { Stack } from '../Stack'
import { Headline1 } from '../Typography'

const ImageWrapper = styled.div`
  ${aspectRatio(2.5)}
`

const ArticleContainer = styled.div`
  ${maxWidthText}
  margin-top: 2.5rem;
  margin-bottom: 3rem;

  ${upFromBreakpoint('small')} {
    margin-top: 3rem;
    margin-bottom: 4rem;
  }

  > * + * {
    margin-top: 2rem;
  }
`

const ShareButtonContainer = styled.div`
  display: flex;
  grid-gap: 1rem;
`

export const Article: FC<
  IPostFields & { type?: 'post' | 'page'; showComments?: boolean }
> = ({
  slug,
  title,
  image,
  richText,
  type = 'post',
  author,
  showComments = true,
}) => {
  const shareUrl = `https://schoen.world/blog/${slug}`

  const imageSrc = image?.fields?.file?.url
  const imageAlt = image?.fields?.description

  return (
    <>
      {imageSrc && (
        <ImageWrapper>
          <Image src={imageSrc} alt={imageAlt || undefined} />
        </ImageWrapper>
      )}
      <ArticleContainer>
        <Headline1>{title}</Headline1>

        <Stack amount={5}>
          <RichText content={richText} />

          {type === 'post' && (
            <>
              {author && <Author {...author.fields} />}
              <ShareButtonContainer>
                <TwitterShareButton url={shareUrl} title={title}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <TelegramShareButton url={shareUrl} title={title}>
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
                <LinkedinShareButton url={shareUrl}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <RedditShareButton url={shareUrl} title={title}>
                  <RedditIcon size={32} round />
                </RedditShareButton>
                <EmailShareButton url={shareUrl} subject={title}>
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </ShareButtonContainer>

              {showComments && <GiscusComments />}
            </>
          )}
        </Stack>
      </ArticleContainer>
    </>
  )
}
