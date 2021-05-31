import { Global } from '@emotion/react'
import { FC } from 'react'

import { useStore } from '../../provider/Store'
import base from './base'
import { theme } from './theme'

export const GlobalStyles: FC = () => {
  const { store } = useStore()
  return (
    <>
      <Global styles={theme(store.themeIsDark)} />
      <Global styles={base} />
    </>
  )
}
