import { FC } from 'react'

import { Avatar as AvatarComponent } from './Avatar'

export default {
  title: 'Avatar',
  component: AvatarComponent,
}

export const Avatar: FC = () => (
  <AvatarComponent src="https://www.fillmurray.com/200/200" />
)
