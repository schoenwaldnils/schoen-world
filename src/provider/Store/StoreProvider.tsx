import { FC, useReducer } from 'react'

import { reducer } from './reducer'
import { initialState, StoreContext } from './Store'
import { getUserLocalStore } from './userStore'

export const StoreProvider: FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, {
    ...initialState,
    ...getUserLocalStore(),
  })

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}
