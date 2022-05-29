import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Types from 'graphql/types'

interface RetroState {
  retro: Types.Retro
  error: string
}

const initialState: RetroState = {
  retro: {
    id: 'a',
    name: 'My simple retro',
    columns: [
      {
        id: 'b',
        name: 'What went well',
        posts: []
      },
      {
        id: 'c',
        name: 'What to improve',
        posts: []
      },
      {
        id: 'd',
        name: 'Action items',
        posts: [
          {
            id: '',
            content: 'Update the retro :)'
          }
        ]
      }
    ],
    createdAt: '0',
    lastUpdated: '0',
    lastViewed: '0',
    timerEnd: '0'
  },
  error: ''
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
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = ''
    }
  }
})

export const actions = retroSlice.actions

export const reducer = retroSlice.reducer
