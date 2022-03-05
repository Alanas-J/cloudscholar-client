import { createSlice } from '@reduxjs/toolkit'

// Will store userdata and login status.
//=========================================================
export const userData = createSlice({
  name: 'userData',
  initialState: {
    value: { 
      loggedIn: false,
      userData: {}
    }
  },
  reducers: {
    updateState: (state, action) => {
      state.value = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateState } = userData.actions;

export default userData.reducer;