import styled from '@emotion/styled'
import { FC } from 'react'

const AvatarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Image = styled.img`
  box-sizing: content-box;
  border: 2px solid var(--Avatar-borderColor);
  border-radius: 50%;
  width: 12rem;
  filter: saturate(100%) grayscale(100%) contrast(105%) brightness(115%);
  transition: filter 150ms;

  :hover {
    filter: saturate(75%);
  }
`

export const Avatar: FC<{ src: string }> = ({ src }) => {
  return (
    <AvatarContainer>
      <Image src={src} />
    </AvatarContainer>
  )
}
