import { FC } from 'react'

import { Checkbox as CheckboxComponent } from './Checkbox'

export default {
  title: 'Form / Checkbox',
  component: CheckboxComponent,
  parameters: {
    percy: { skip: true }, //TODO fix when using checkbox
  },
}

export const Checkbox: FC = () => (
  <>
    <CheckboxComponent
      id="testCheckbox"
      label="Lorem Ipsum"
      // eslint-disable-next-line no-console
      onChange={(e) => console.log(e.target.checked)}
    />

    <CheckboxComponent
      id="testCheckbox"
      label="Lorem Ipsum"
      // eslint-disable-next-line no-console
      onChange={(e) => console.log(e.target.checked)}
      disabled
    />

    <CheckboxComponent
      id="testCheckbox2"
      label="Lorem Ipsum"
      // eslint-disable-next-line no-console
      onChange={(e) => console.log(e.target.checked)}
      checked
    />

    <CheckboxComponent
      id="testCheckbox2"
      label="Lorem Ipsum"
      // eslint-disable-next-line no-console
      onChange={(e) => console.log(e.target.checked)}
      checked
      disabled
    />
  </>
)
