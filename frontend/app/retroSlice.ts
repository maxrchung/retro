import { createSlice } from '@reduxjs/toolkit'

export const retroSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    columns: []
  },
  reducers: {
    getAllColumns: (state, action) => {
      console.log(action);
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

export const { getAllColumns, increment, decrement, incrementByAmount } = retroSlice.actions
export default retroSlice.reducer