import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import Cart from './Cart';
import { handleCartItems } from '../redux/CartSlice';

const Header = () => {

    let { cart } = useSelector(state => state.cart)
    let dispatch = useDispatch()

    
    return (
        <nav className="bg-gray-400 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Home</span>
                </Link>
                <div className="block w-auto">
                    <ul className="font-medium flex text-xl border-gray-100 rounded-lg flex-row space-x-8 rtl:space-x-reverse mt-0 border-0">
                        <li onClick={()=>dispatch(handleCartItems())} className='relative cursor-pointer'>
                            <span
                                className={`block text-3xl text-white bg-blue-700 rounded bg-transparent p-0}`}
                            >
                                <FaCartShopping />
                            </span>

                            <span className='absolute rounded-full -top-2 -right-2 w-5 h-5 bg-black text-sm text-white flex items-center justify-center'>{cart.length}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
