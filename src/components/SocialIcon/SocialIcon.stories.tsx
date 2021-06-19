import { FC } from 'react'

import { SocialIcon as SocialIconComponent } from './SocialIcon'

export default {
  title: 'Social Icon',
  component: SocialIconComponent,
  parameters: {
    percy: { skip: true }, // part of footer
  },
}

export const SocialIcon: FC = () => (
  <>
    <SocialIconComponent name="Twitter" href="#" />
    <SocialIconComponent name="Github" href="#" />
  </>
)
