import { FC } from 'react'

import { SocialIcon as SocialIconComponent } from './SocialIcon'

export default {
  title: 'Social Icon',
  component: SocialIconComponent,
}

export const SocialIcon: FC = () => (
  <>
    <SocialIconComponent name="Twitter" href="#" />
    <SocialIconComponent name="Github" href="#" />
  </>
)
