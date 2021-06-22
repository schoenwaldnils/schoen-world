import { Theme } from '../../@types/Theme'
import { getUserLocalStore, setUserLocalStore } from './userStore'

export const SET_INIT = 'SET_INIT'
export const SET_THEME = 'SET_THEME'

type SET_INIT = 'SET_INIT'
type SET_THEME = 'SET_THEME'

export type Store = {
  theme: Theme
}

export type Action = { type: SET_INIT } | { type: SET_THEME; theme: Theme }

type Reducer<S, A> = (store: S, action: A) => S

export const reducer: Reducer<Store, Action> = (store, action) => {
  // console.log('action.type', action.type)

  switch (action.type) {
    case SET_INIT:
      return {
        ...store,
        ...getUserLocalStore(),
      }

    case SET_THEME:
      setUserLocalStore({
        theme: action.theme,
      })
      return {
        ...store,
        theme: action.theme,
      }

    default:
      throw new Error()
  }
}
