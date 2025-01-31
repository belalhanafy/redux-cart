import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartSlice";
import { wishListReducer } from "./WishListSlice";
export let store = configureStore({
    reducer:{
        // waiting for reducer
        cart: cartReducer,
        wishList: wishListReducer
    }
});