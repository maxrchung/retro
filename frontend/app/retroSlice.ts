import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Types from 'backend/types'

interface RetroState {
  columns: Types.Column[]
}

const initialState: RetroState = {
  columns: []
}

export const retroSlice = createSlice({
  name: 'retro',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Types.AddCommentResponsePayload>) => {
      const index = state.columns.findIndex(
        columns => columns.id == action.payload.column.id
      )
      state.columns[index] = action.payload.column
    },
    getAllColumns: (state, action: PayloadAction<Types.GetAllColumnsResponsePayload>) => {
      state.columns = action.payload.columns
    },
  }
})

export const {
  getAllColumns,
  addComment
} = retroSlice.actions

export default retroSlice.reducer