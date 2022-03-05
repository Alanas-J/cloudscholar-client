import { createSlice } from '@reduxjs/toolkit'

// Will store userdata and login status.
//=========================================================
export const userState = createSlice({
  name: 'userState',
  initialState: {
    value: { 
      loggedIn: false,
      userData: {}
    }
  },
  reducers: {
    updateUserState: (state, action) => {
      state.value = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateUserState } = userState.actions;

export default userState.reducer;