import { createSlice } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";

let initialState = {
    wishList: localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : [],
    isOpen: false
};

const updateLocalStorage = (wishList) => {
    localStorage.setItem('wishList', JSON.stringify(wishList));
};

const wishListSlice = createSlice({
    name: "wishListSlice",
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            state.wishList.push(action.payload); // ✅ Fix: Store only the payload

            toast.success('Item added successfully to wishlist', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            updateLocalStorage(state.wishList); // Sync to localStorage
        },
        removeFromWishList: (state, action) => {
            state.wishList = state.wishList.filter(item => item.id !== action.payload.id);

            toast.success('Item removed successfully from wishlist', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            updateLocalStorage(state.wishList); // Sync to localStorage
        }
    }
});

export let wishListReducer = wishListSlice.reducer;
export let { addToWishList, removeFromWishList } = wishListSlice.actions;
