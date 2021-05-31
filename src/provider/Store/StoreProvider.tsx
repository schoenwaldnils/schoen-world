import { FC, useEffect, useReducer } from 'react'

import { reducer, SET_THEME } from './reducer'
import { initialState, StoreContext } from './Store'
import { getUserLocalStore, getUserSessionStore } from './userStore'

export const StoreProvider: FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, {
    ...initialState,
    ...getUserLocalStore(),
  })

  useEffect(() => {
    /**
     * dark mode
     */
    const matchDark = '(prefers-color-scheme: dark)'
    const matcher = window.matchMedia && window.matchMedia(matchDark)
    let preferesDark = !!matcher.matches

    const sessionStore = getUserSessionStore()
    if (typeof sessionStore.themeIsDark !== 'undefined') {
      preferesDark = sessionStore.themeIsDark
    }

    if (preferesDark !== store.themeIsDark) {
      dispatch({ type: SET_THEME, themeIsDark: preferesDark })
    }
  }, [store, dispatch])

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}
