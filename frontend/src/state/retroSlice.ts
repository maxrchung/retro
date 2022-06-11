import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Types from 'backend/src/types'
import { OptionsUpdatedSubscription } from 'backend/src/types'

interface RetroState {
  retro: Types.Retro
  info: string
  errors: string[]
  connectionId: string
}

const defaultDateString = new Date().toISOString()

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
            id: 'e',
            content: 'Update the retro :)',
            author: 'retro',
            likes: []
          }
        ]
      }
    ],
    showPosts: true,
    createdAt: defaultDateString,
    lastUpdated: defaultDateString,
    lastViewed: defaultDateString,
    timerEnd: defaultDateString
  },
  info: '',
  errors: [],
  connectionId: ''
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
    updateOptions: (
      state,
      action: PayloadAction<OptionsUpdatedSubscription['optionsUpdated']>
    ) => {
      state.retro.name = action.payload.name
      state.retro.timerEnd = action.payload.timerEnd
      state.retro.showPosts = action.payload.showPosts
    },
    updateColumns: (state, action: PayloadAction<Array<Types.Column>>) => {
      state.retro.columns = action.payload
    },
    updateTimer: (state, action: PayloadAction<string>) => {
      state.retro.timerEnd = action.payload
    },
    setInfo: (state, action: PayloadAction<string>) => {
      state.info = action.payload
    },
    setErrors: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload
    },
    clearInfo: (state) => {
      state.info = ''
    },
    clearErrors: (state) => {
      state.errors = []
    },
    resetState: (state) => {
      state.retro = initialState.retro
      state.errors = initialState.errors
    },
    setConnectionId: (state, action: PayloadAction<string>) => {
      state.connectionId = action.payload
    }
  }
})

export const actions = retroSlice.actions

export const reducer = retroSlice.reducer
