import styled from '@emotion/styled'
import { FC, ImgHTMLAttributes } from 'react'

import { Image } from '../Image'

const AvatarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Img = styled(Image)`
  box-sizing: content-box;
  border: 2px solid var(--Avatar-borderColor) !important;
  border-radius: 50%;
  filter: saturate(100%) grayscale(100%) contrast(105%) brightness(115%);
  transition: filter 150ms;

  :hover {
    filter: saturate(75%);
  }
`

export const Avatar: FC<ImgHTMLAttributes<HTMLImageElement> & { src: string }> =
  ({ src, alt }) => {
    return (
      <AvatarContainer>
        <Img src={src} alt={alt} width={200} height={200} lazy />
      </AvatarContainer>
    )
  }
