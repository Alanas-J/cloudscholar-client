import { createSlice } from '@reduxjs/toolkit'

export const modalState = createSlice({
    name: 'modalState',
    initialState: {
        value: {
            currState: { name: null },
            prevState: { name: null }
        }
    },
    reducers: {
        openModal: (state, action) => {

            if (state.value.currState) {
                state.value.prevState = state.value.currState;
            }

            state.value.currState = action.payload;
        },

        closeModal: (state) => {
            state.value.currState = state.value.prevState;
            state.value.prevState = { name: null };
        }
    }
})

export const { openModal, closeModal } = modalState.actions;
export default modalState.reducer;