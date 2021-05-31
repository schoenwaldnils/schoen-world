import { FC } from 'react'

import { Quote as QuoteComponent } from './Quote'

export default {
  title: 'Typography / Quote',
  component: QuoteComponent,
}

export const Quote: FC = () => (
  <QuoteComponent>
    The ships hung in the sky in much the same way that bricks don't. <br />―
    Douglas Adams, The Hitchhiker's Guide to the Galaxy
  </QuoteComponent>
)
