import { configureStore } from '@reduxjs/toolkit'
import retroReducer from './retroSlice'

const store = configureStore({
  reducer: {
    retro: retroReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch