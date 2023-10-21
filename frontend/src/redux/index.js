import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import ProductSliceReducer from './createSlide';

export const store = configureStore({
  reducer: {
    user:userSliceReducer,
    product:ProductSliceReducer
  },
})