import { createSlice } from '@reduxjs/toolkit'

// Designed to support 1 nested modal at the moment
//=========================================================
export const modalState = createSlice({
  name: 'modalState',
  initialState: {
    value: { 
      currState: null,
      prevState: null
    }
  },
  reducers: {
    openModal: (state, action) => {

      // If any modal is already open.
      if(state.value.currState){
        state.value.prevState = state.value.currState;
      }

      state.value.currState = action.payload;
    },
    closeModal: (state) => {
      state.value.currState = state.value.prevState;
      state.value.prevState = null;
    }
  } // TODO: Add a open viewmodal 
})

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = modalState.actions;

export default modalState.reducer;