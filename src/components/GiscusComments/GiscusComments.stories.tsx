import { FC } from 'react'

import { GiscusComments as GiscusCommentsComponent } from './GiscusComments'

export default {
  title: 'Giscus Comments',
  component: GiscusCommentsComponent,
  parameters: {
    percy: { skip: true }, // part of article
  },
}

export const GiscusComments: FC = () => <GiscusCommentsComponent />
