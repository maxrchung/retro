import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Types from 'backend/types'

interface RetroState {
  columns: Types.Column[],
  socket: WebSocket | null
}

const initialState: RetroState = {
  columns: [],
  socket: null
}

export const retroSlice = createSlice({
  name: 'retro',
  initialState,
  reducers: {
    getComment: (state, action: PayloadAction<Types.GetCommentResponsePayload>) => {
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
  getComment,
  getAllColumns,
} = retroSlice.actions

export default retroSlice.reducer