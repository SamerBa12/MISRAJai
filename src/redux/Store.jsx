import { configureStore } from "@reduxjs/toolkit";
import sliceTheme from "./SliceTheme";

export const store = configureStore({
    reducer: {
        sliceTheme: sliceTheme
    }
})