import { FC } from 'react'

import { Avatar as AvatarComponent } from './Avatar'

export default {
  title: 'Avatar',
  component: AvatarComponent,
}

export const Avatar: FC = () => (
  <AvatarComponent src="https://picsum.photos/id/1074/200/200" />
)
