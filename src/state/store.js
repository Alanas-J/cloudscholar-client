import { configureStore } from '@reduxjs/toolkit';
import displayReducer from './slices/appDisplay';
import modalReducer from './slices/modalState';
import userStateReducer from './slices/userState'

export default configureStore({
  reducer: {
    appDisplay: displayReducer,
    modalState: modalReducer,
    userState: userStateReducer
  }
})