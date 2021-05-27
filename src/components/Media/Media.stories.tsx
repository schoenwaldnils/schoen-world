import { FC } from 'react'

import { IMedia } from '../../../typings/generated/contentful'
import { Media as MediaComponent } from './Media'
import mediaMock from './mediaMock.json'

export default {
  title: 'Media',
  component: MediaComponent,
}

const media = mediaMock as unknown as IMedia

export const Media: FC = () => <MediaComponent {...media.fields} />
