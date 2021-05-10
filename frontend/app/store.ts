import { configureStore } from '@reduxjs/toolkit';
import retroReducer from './retroSlice';

export default configureStore({
  reducer: {
    retro: retroReducer
  }
})