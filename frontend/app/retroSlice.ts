import { createSlice } from '@reduxjs/toolkit'

interface RetroState {
  columns: Column[]
}

interface Column {
  uuid: string,
  name: string,
  comments: Comment[]
}

interface Comment {
  uuid: string,
  value: string
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