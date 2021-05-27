import { FC } from 'react'

import { ICodePenEmbedFields } from '../../@types/generated/contentful'
import { Link } from '../Typography'

export const CodePenEmbed: FC<ICodePenEmbedFields> = ({
  title,
  username,
  id,
  height = 300,
  defaultPanes,
}) => {
  return (
    <>
      <p
        data-height={height}
        data-theme-id="26304"
        data-slug-hash={id}
        data-default-tab={defaultPanes.join(',')}
        data-user={username}
        data-embed-version="2"
        data-pen-title={title}
        className="codepen"
      >
        See the Pen{' '}
        <Link href={`https://codepen.io/${username}/pen/${id}/`}>{title}</Link>{' '}
        by {username} (
        <Link href={`https://codepen.io/${username}`}>@{username}</Link>) on{' '}
        <Link href="https://codepen.io">CodePen</Link>.
      </p>
      <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js" />
    </>
  )
}
