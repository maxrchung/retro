import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Types from 'graphql/types'

interface RetroState {
  retro: Types.Retro
}

const initialState: RetroState = {
  retro: {
    id: '',
    name: '',
    columns: [],
    createdAt: '',
    lastUpdated: '',
    lastViewed: '',
    timerEnd: ''
  }
}

export const retroSlice = createSlice({
  name: 'retro',
  initialState,
  reducers: {
    updateRetro: (state, action: PayloadAction<Types.Retro>) => {
      state.retro = action.payload
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.retro.name = action.payload
    },
    updateColumns: (state, action: PayloadAction<Array<Types.Column>>) => {
      state.retro.columns = action.payload
    },
    updateTimer: (state, action: PayloadAction<string>) => {
      state.retro.timerEnd = action.payload
    }
  }
})

export const actions = retroSlice.actions

export const reducer = retroSlice.reducer
