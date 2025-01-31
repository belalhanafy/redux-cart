import { createSlice } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";

const updateLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

let initialState = { cart:localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [], totalPrice:0,isOpen: false }

let cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        // addToCart(state, action) {
        //     const IteamIndex = state.cart.findIndex((iteam) => iteam.id === action.payload.id);
        //     if (IteamIndex >= 0) {
        //         state.cart[IteamIndex].qnty += 1;
        //     }else{
        //         const temp = { ...action.payload, qnty: 1 }
        //         state.cart = [...state.cart, temp]
        //     }
        // },
        addToCart(state, action) {
            const IteamIndex = state.cart.findIndex((iteam) => iteam.id === action.payload.id);
            if (IteamIndex >= 0) {
                state.cart[IteamIndex].qnty += 1; // Update quantity for existing item instead add it again
            } else {
                const temp = { ...action.payload, qnty: 1 };
                state.cart.push(temp); // Push new item to the draft state
                toast.success('item added successfully to cart', {
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
            }
            updateLocalStorage(state.cart); // Sync to localStorage
        },

        deleteProduct(state,action){
            state.cart = state.cart.filter(item => item.id !== action.payload.id)
            updateLocalStorage(state.cart); // Sync to localStorage
            toast.success('item deleted successfully', {
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
        },
        increaseQuantity(state,action){
            const IteamIndex = state.cart.findIndex((iteam) => iteam.id === action.payload.id);
            state.cart[IteamIndex].qnty += 1
            updateLocalStorage(state.cart); // Sync to localStorage
        },
        decreaseQuantity(state,action){
            const IteamIndex = state.cart.findIndex((iteam) => iteam.id === action.payload.id);
            state.cart[IteamIndex].qnty -= 1
            updateLocalStorage(state.cart); // Sync to localStorage
        },
        emptyCart(state){
            state.cart = []
            localStorage.removeItem('cart')
            toast.success('Your Cart Is Empty', {
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
        },
        getTotalPrice(state) {
            let total = 0;
            (state.cart).map((item) => {
                total = (item.price * item.qnty) + total
            });
            state.totalPrice = total
        },
        // getTotalPrice: (state) => {
        //     state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.qnty, 0); // Correct usage
        // }
        handleCartItems : (state) => {
            state.isOpen = !state.isOpen;
            document.body.style.overflow = state.isOpen ? "hidden" : "auto";
        }
    }
})

export let cartReducer = cartSlice.reducer;

export let { addToCart, deleteProduct, increaseQuantity, decreaseQuantity, emptyCart, getTotalPrice,handleCartItems } = cartSlice.actions;










































//----------------------------------------------------------
// How Draft State Works
//      Immer creates a draft: When a reducer function runs, Immer wraps the state with a proxy to track changes.
//      You mutate the draft: You can write mutations like state.property = value or array.push(value).
//      Immer generates a new immutable state: Once the reducer function finishes, Immer creates a new state object reflecting the changes.




// A draft state is a concept introduced by Immer.js (used internally by Redux Toolkit)  that simplifies working with immutable state in JavaScript. When you use Redux Toolkit, Immer automatically creates a draft version of the state inside your reducers, which you can safely modify as if it were mutable. Immer then produces a new immutable state based on your changes to the draft.




// The error occurs because Immer.js (used internally by Redux Toolkit) enforces immutability by making your state read-only during updates. In your increaseQuantity reducer function, the line action.payload.qnty++ tries to directly mutate the qnty property, which violates this immutability.

// Here's why this happens:

//     Redux Toolkit and Immer: Redux Toolkit uses Immer.js under the hood to manage state immutably. Immer creates a draft of the state, which you can safely mutate as if it were mutable. However, directly mutating properties like action.payload.qnty is not allowed because action.payload is not part of the draft state—it's part of the action.

//     Why qnty is read-only: action.payload.qnty belongs to the action object, not the state managed by Immer. Redux and Immer expect you to only modify the state or draft state, not the action.payload.
//----------------------------------------------------------