import { FC } from 'react'

import { Link as LinkComponent } from './Link'

export default {
  title: 'Typography / Link',
  component: LinkComponent,
}

export const Link: FC = () => (
  <>
    <div>
      <LinkComponent href="#">Lorem Ipsum</LinkComponent>
    </div>
    <div>
      <LinkComponent href="https://schoen.world/">Lorem Ipsum</LinkComponent>
    </div>
  </>
)
