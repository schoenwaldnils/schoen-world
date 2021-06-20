import { FC } from 'react'

import { Radio as RadioComponent } from './Radio'

export default {
  title: 'Form / Radio',
  component: RadioComponent,
  parameters: {
    percy: { skip: true },
  },
}

export const Radio: FC = () => (
  <>
    <RadioComponent
      id="testRadio1"
      name="testId"
      label="Lorem Ipsum"
      // eslint-disable-next-line no-console
      onChange={(e) => console.log(e.target.checked)}
    />

    <RadioComponent
      id="testRadio2"
      name="testId"
      label="Lorem Ipsum"
      // eslint-disable-next-line no-console
      onChange={(e) => console.log(e.target.checked)}
      disabled
    />

    <RadioComponent
      id="testRadio3"
      name="testId"
      label="Lorem Ipsum"
      // eslint-disable-next-line no-console
      onChange={(e) => console.log(e.target.checked)}
      checked
    />

    <RadioComponent
      id="testRadio4"
      name="testId"
      label="Lorem Ipsum"
      // eslint-disable-next-line no-console
      onChange={(e) => console.log(e.target.checked)}
      checked
      disabled
    />
  </>
)
