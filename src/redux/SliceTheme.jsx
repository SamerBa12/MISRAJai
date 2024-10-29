import { createSlice } from "@reduxjs/toolkit";

export const sliceTheme = createSlice({
    name: 'sliceTheme',
    initialState: {
        mode: 'light'
    },
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
    }
})

export const { toggleTheme } = sliceTheme.actions
export default sliceTheme.reducer