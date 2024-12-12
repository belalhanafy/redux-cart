import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartSlice";
export let store = configureStore({
    reducer:{
        // waiting for reducer
        cart: cartReducer
    }
});