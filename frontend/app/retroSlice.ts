import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Retro } from 'backend/types'

interface RetroState {
  retro: Retro
}

const initialState: RetroState = {
  retro: {
    id: '',
    columns: []
  }
}

export const retroSlice = createSlice({
  name: 'retro',
  initialState,
  reducers: {
    setRetro: (state, action: PayloadAction<Retro>) => {
      state.retro = action.payload
    }
  }
})

export const actions = retroSlice.actions

export const reducer = retroSlice.reducer
