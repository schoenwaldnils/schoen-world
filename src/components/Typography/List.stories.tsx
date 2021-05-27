import { FC } from 'react'

import { LI, OL, UL } from './List'

export default {
  title: 'Typography / Lists',
}

export const Lists: FC = () => (
  <>
    <UL>
      <LI>Lorem Ipsum</LI>
      <LI>Lorem Ipsum</LI>
      <LI>Lorem Ipsum</LI>
    </UL>
    <OL>
      <LI>Lorem Ipsum</LI>
      <LI>Lorem Ipsum</LI>
      <LI>Lorem Ipsum</LI>
    </OL>
  </>
)
