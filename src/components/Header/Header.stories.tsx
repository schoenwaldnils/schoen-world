import { FC } from 'react'

import { Header as HeaderComponent } from './Header'

export default {
  title: 'Header',
  component: HeaderComponent,
  parameters: {
    layout: 'fullscreen',
    percy: { skip: true },
  },
}

export const Header: FC = () => <HeaderComponent />
