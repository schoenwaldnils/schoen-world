import { FC } from 'react'

import { Footer as FooterComponent } from './Footer'

export default {
  title: 'Footer',
  component: FooterComponent,
  parameters: {
    layout: 'fullscreen',
    percy: { skip: true },
  },
}

export const Footer: FC = () => <FooterComponent />
