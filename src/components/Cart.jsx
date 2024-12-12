import React, { useEffect, useState } from 'react'
import { FaShoppingCart, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, deleteProduct, emptyCart, increaseQuantity, getTotalPrice } from '../redux/CartSlice';
import { Bounce, toast } from 'react-toastify';
const Cart = () => {
    const dispatch = useDispatch();
    let { cart, totalPrice } = useSelector(state => state.cart)
    useEffect(() => {
        dispatch(getTotalPrice())
    }, [cart])

    return (
        <div className="flex justify-center m-0">
            <div className="w-full md:w-3/4 lg:w-2/3 mt-5 mb-5">
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="bg-gray-800 p-4 rounded-t-lg">
                        <div className="flex items-center justify-between">
                            <h5 className="text-white text-lg">
                                Cart Calculation {cart.length > 0 ? `(${cart.length})` : ''}
                            </h5>
                            {cart.length > 0 && (
                                <button
                                    onClick={() => dispatch(emptyCart())}
                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center"
                                >
                                    <FaTrashAlt className="mr-2" />
                                    <span>Empty Cart</span>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="p-0">
                        {cart.length === 0 ? (
                            <table className="w-full text-center">
                                <tbody>
                                    <tr>
                                        <td colSpan={6}>
                                            <div className="flex flex-col items-center py-10">
                                                <FaShoppingCart className="text-gray-400 text-6xl mb-3" />
                                                <p className="text-gray-500">Your Cart Is Empty</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="py-3 px-2 text-left">Action</th>
                                        <th className="py-3 px-2">Product</th>
                                        <th className="py-3 px-2">Name</th>
                                        <th className="py-3 px-2">Price</th>
                                        <th className="py-3 px-2">Qty</th>
                                        <th className="py-3 px-2 text-right">Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-3 px-2 ">
                                                <button
                                                    onClick={() => dispatch(deleteProduct(item))}
                                                    className="text-red-600 bg-red-200 p-3 rounded-md"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                            <td className="py-3 px-2">
                                                <div className="w-16 h-16">
                                                    <img
                                                        className="w-full h-full object-cover rounded"
                                                        src={item.imgdata}
                                                        alt={item.rname}
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-3 px-2">{item.rname}</td>
                                            <td className="py-3 px-2">$ {item.price}</td>
                                            <td className="py-3 px-2">
                                                <div className="flex items-center">
                                                    {item.qnty === 1 ? (
                                                        <button
                                                            disabled
                                                            onClick={() => dispatch(decreaseQuantity(item))}
                                                            className="bg-gray-200 cursor-not-allowed p-2 rounded w-10 h-10 flex items-center justify-center"
                                                        >
                                                            <FaMinus />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => dispatch(decreaseQuantity(item))}
                                                            className=" bg-gray-200 p-2 rounded w-10 h-10 flex items-center justify-center"
                                                        >
                                                            <FaMinus />
                                                        </button>
                                                    )}
                                                    <input
                                                        type="text"
                                                        className="w-10 h-10 text-center mx-2 border rounded"
                                                        value={item.qnty}
                                                        disabled
                                                    />

                                                    <button
                                                        onClick={() => dispatch(increaseQuantity(item))}
                                                        className="bg-gray-200 p-2 rounded w-10 h-10 flex items-center justify-center"
                                                    >
                                                        <FaPlus />
                                                    </button>


                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-right">$ {item.qnty * item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-gray-100">
                                        <th className="py-3 px-2"></th>
                                        <th colSpan={3} className="py-3 px-2"></th>
                                        <th className="py-3 px-2">
                                            Items In Cart: <span className="text-red-600">{cart.length}</span>
                                        </th>
                                        <th className="py-3 px-2 text-right">
                                            Total Price: <span className="text-red-600">$ {totalPrice}</span>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart