import { Global } from '@emotion/react'
import { FC } from 'react'

// import { useStore } from '../Store'
import base from './base'

export const GlobalStyles: FC = () => {
  // const { store } = useStore()
  return (
    <>
      <Global styles={base} />
    </>
  )
}
