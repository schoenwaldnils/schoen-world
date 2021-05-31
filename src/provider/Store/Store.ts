import { createContext, Dispatch, useContext } from 'react'

import { Action, Store } from './reducer'

export const initialState: Store = {
  themeIsDark: false,
}

type Context = {
  store: Store
  dispatch: Dispatch<Action>
}

export const StoreContext = createContext<Context>({
  store: initialState,
  dispatch: () => null,
})

export const useStore = (): Context => useContext(StoreContext)
