import { createSlice } from '@reduxjs/toolkit'

export const appDisplay = createSlice({
    name: 'appDisplay',
    initialState: {
        value: "home"
    },
    reducers: {
        setDisplay: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setDisplay } = appDisplay.actions;
export default appDisplay.reducer;