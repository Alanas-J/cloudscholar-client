import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import displayReducer from './slices/appDisplay';

export default configureStore({
  reducer: {
    counter: counterReducer,
    appDisplay: displayReducer
  }
})