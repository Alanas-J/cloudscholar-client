import { createSlice } from '@reduxjs/toolkit'

export const appDisplay = createSlice({
  name: 'appDisplay',
  initialState: {
    value: "start"
  },
  reducers: {
    setDisplay: (state, action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setDisplay } = appDisplay.actions;

export default appDisplay.reducer;