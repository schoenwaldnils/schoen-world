import { FC } from 'react'

import {
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
} from './Headline'

export default {
  title: 'Typography / Headline',
}

export const Headline: FC = () => (
  <>
    <Headline1>
      Heading 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      dolorum non tempora aperiam temporibus eos.
    </Headline1>
    <Headline2>
      Heading 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      dolorum non tempora aperiam temporibus eos.
    </Headline2>
    <Headline3>
      Heading 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      dolorum non tempora aperiam temporibus eos.
    </Headline3>
    <Headline4>
      Heading 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      dolorum non tempora aperiam temporibus eos.
    </Headline4>
    <Headline5>
      Heading 5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      dolorum non tempora aperiam temporibus eos.
    </Headline5>
    <Headline6>
      Heading 6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      dolorum non tempora aperiam temporibus eos.
    </Headline6>
  </>
)
