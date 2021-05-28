import { createSlice } from '@reduxjs/toolkit'

export const retroSlice = createSlice({
  name: 'retro',
  initialState: {
    value: 0,
    columns: []
  },
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
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const {
  getAllColumns,
  addComment,
  increment,
  decrement,
  incrementByAmount
} = retroSlice.actions

export default retroSlice.reducer