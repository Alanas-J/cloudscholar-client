import { createSlice } from '@reduxjs/toolkit'

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

export const { updateUserState } = userState.actions;
export default userState.reducer;