import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import displayReducer from './slices/appDisplay';
import modalReducer from './slices/modalState';
import userDataReducer from './slices/userData'

export default configureStore({
  reducer: {
    counter: counterReducer,
    appDisplay: displayReducer,
    modalState: modalReducer,
    userData: userDataReducer
  }
})