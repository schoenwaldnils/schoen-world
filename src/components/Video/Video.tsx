import { FC, VideoHTMLAttributes } from 'react'

export const Video: FC<VideoHTMLAttributes<HTMLVideoElement>> = ({
  src,
  ...props
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video {...props} src={src} controls>
      Sorry, your browser doesn't support embedded videos, but don't worry, you
      can{' '}
      <a href={src} download>
        download it
      </a>
      and watch it with your favorite video player!
    </video>
  )
}
