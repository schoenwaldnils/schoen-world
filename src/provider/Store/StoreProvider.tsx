import { FC, useEffect, useReducer, useRef } from 'react'

import { reducer, SET_THEME } from './reducer'
import { initialState, StoreContext } from './Store'
import { getUserLocalStore } from './userStore'

export const StoreProvider: FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, {
    ...initialState,
    ...getUserLocalStore(),
  })

  const docRef = useRef<HTMLBodyElement>()

  useEffect(() => {
    if (!docRef.current) {
      docRef.current = document.firstElementChild as HTMLBodyElement
    }

    docRef.current.setAttribute('color-scheme', store.theme)
  }, [store.theme])

  useEffect(() => {
    /**
     * dark mode
     */
    const localStore = getUserLocalStore()

    let theme = store.theme

    if (typeof localStore.theme !== 'undefined') {
      theme = localStore.theme
    }

    if (theme !== store.theme) {
      dispatch({ type: SET_THEME, theme: store.theme })
    }
  }, [store, dispatch])

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}
