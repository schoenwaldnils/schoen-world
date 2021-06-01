import { FC } from 'react'

import { Page as PageComponent } from './Page'

export default {
  title: 'Page',
  component: PageComponent,
  parameters: {
    layout: 'fullscreen',
  },
}

export const Page: FC = () => <PageComponent />
