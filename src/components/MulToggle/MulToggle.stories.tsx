import { FC, useState } from 'react'

import { MulToggle as MulToggleComponent } from './MulToggle'

export default {
  title: 'MulToggle',
  component: MulToggleComponent,
  parameters: {
    percy: { skip: true }, // part of footer
  },
}

const items = ['one', 'two', 'three']

export const MulToggle: FC = () => {
  const [value, setValue] = useState<string>()

  return (
    <MulToggleComponent
      items={items.map((i) => ({ id: i, node: i }))}
      value={value}
      setValue={setValue}
    />
  )
}
