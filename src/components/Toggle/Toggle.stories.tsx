import { FC, useState } from 'react'

import { Toggle as ToggleComponent } from './Toggle'

export default {
  title: 'Toggle',
  component: ToggleComponent,
}

export const Toggle: FC = () => {
  const [isLeft, setIsLeft] = useState(true)
  return (
    <ToggleComponent
      left="Left"
      right="Right"
      isLeft={isLeft}
      toggleIsLeft={() => setIsLeft((curr) => !curr)}
    />
  )
}
