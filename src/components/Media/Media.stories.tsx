import { FC } from 'react'

import { IMediaFields } from '../../@types/generated/contentful'
import { Media as MediaComponent } from './Media'
import mock from './mediaMock.json'

export default {
  title: 'Media',
  component: MediaComponent,
  parameters: {
    percy: { skip: true }, // part of article
  },
}

export const Media: FC = () => (
  <MediaComponent
    {...(mock as unknown as IMediaFields)}
    description="Lorem Ipsum"
  />
)
