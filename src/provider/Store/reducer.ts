import { getUserLocalStore } from './userStore'

export const SET_INIT = 'SET_INIT'
export const SET_THEME = 'SET_THEME'

type SET_INIT = 'SET_INIT'

export type Store = {
  themeIsDark: boolean
}

export type Action = { type: SET_INIT }

type Reducer<S, A> = (store: S, action: A) => S

export const reducer: Reducer<Store, Action> = (store, action) => {
  // console.log('action.type', action.type)

  switch (action.type) {
    case SET_INIT:
      return {
        ...store,
        ...getUserLocalStore(),
      }

    default:
      throw new Error()
  }
}
