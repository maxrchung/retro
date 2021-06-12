import { createSlice } from '@reduxjs/toolkit'
import { Column } from 'backend/types'

interface RetroState {
  columns: Column[]
}

const initialState: RetroState = {
  columns: []
}

export const retroSlice = createSlice({
  name: 'retro',
  initialState,
  reducers: {
    addComment: (state, action) => {
      console.log(action)
      const index = state.columns.findIndex(
        columns => columns.uuid == action.payload.uuid
      );
      state.columns[index] = action.payload;
    },
    getAllColumns: (state, action) => {
      state.columns = action.payload
    },
  }
})

export const {
  getAllColumns,
  addComment
} = retroSlice.actions

export default retroSlice.reducer