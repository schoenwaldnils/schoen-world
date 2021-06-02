import { Global } from '@emotion/react'
import { FC } from 'react'

import { useStore } from '../../provider/Store'
import { base } from './base'
import { fonts } from './fonts'
import { theme } from './theme'

export const GlobalStyles: FC = () => {
  const { store } = useStore()
  return (
    <>
      <Global styles={theme(store.themeIsDark)} />
      <Global styles={fonts} />
      <Global styles={base} />
    </>
  )
}
