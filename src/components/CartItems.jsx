import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaXmark } from "react-icons/fa6";
import { FaMinus, FaPlus, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { handleCartItems } from '../redux/CartSlice';
import { decreaseQuantity, deleteProduct, emptyCart, increaseQuantity, getTotalPrice } from '../redux/CartSlice';

const CartItems = () => {
    const { cart, isOpen, totalPrice } = useSelector(state => state.cart)
    let nav = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTotalPrice())
    }, [cart, dispatch])

    return (
        <>
            <div className={`fixed overflow-auto top-16 right-0 bottom-0 transition-all duration-200 ${isOpen ? 'w-96 opacity-100' : 'w-0 opacity-0'} bg-white z-10`}>
                <div className='px-5 py-3 flex justify-between items-center'>
                    <h3 className='text-xl'>Your Cart <span className=' text-cyan-500'>{cart.length}</span> <span className='uppercase'>item</span></h3>
                    <span onClick={() => dispatch(handleCartItems())} className='text-xl hover:text-red-700 hover:rotate-180 transition-all duration-500 cursor-pointer'>
                        <FaXmark />
                    </span>
                </div>
                {cart.length <= 0 ? (
                    <div className="flex flex-col items-center py-10">
                        <FaShoppingCart className="text-gray-400 text-6xl mb-3" />
                        <p className="text-gray-500">Your Cart Is Empty</p>
                    </div>
                ) : (
                    cart.map((item) => (
                        
                        <div className='border border-b-gray-500 p-2 flex items-start gap-2' key={item.id}>
                            <div>
                                <img className='block w-16 h-[70px] ' src={item.imgdata} alt={item.rname} />
                            </div>
                            <div>
                                <h2>{item.rname}</h2>
                                <p>price: <span className='font-medium text-gray-600'> ${item.price}</span></p>
                                <Link to={`/cardDetails/${item.id}`} className='underline'>More Details</Link>
                            </div>
                            <div className='flex-1'>
                                <div className="flex flex-col items-end">
                                    <div className='flex items-center'>
                                        {item.qnty === 1 ? (
                                            <button
                                                disabled
                                                onClick={() => dispatch(decreaseQuantity(item))}
                                                className="bg-gray-200 cursor-not-allowed p-2 rounded w-6 h-6 flex items-center justify-center"
                                            >
                                                <FaMinus />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => dispatch(decreaseQuantity(item))}
                                                className=" bg-gray-200 p-2 rounded w-6 h-6 flex items-center justify-center"
                                            >
                                                <FaMinus />
                                            </button>
                                        )}
                                        <input
                                            type="text"
                                            className="w-6 h-6 text-center mx-2 border rounded"
                                            value={item.qnty}
                                            disabled
                                        />

                                        <button
                                            onClick={() => dispatch(increaseQuantity(item))}
                                            className="bg-gray-200 p-2 rounded w-6 h-6 flex items-center justify-center"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>

                                    <p>Total Price: <span className='font-medium text-gray-600'> ${item.price * item.qnty}</span></p>

                                    <div>
                                        <button
                                            onClick={() => dispatch(deleteProduct(item))}
                                            className="text-red-600 bg-red-200 p-3 rounded-md"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                )}
                {cart.length > 0 && (
                    <>
                        <div className='py-1 px-5'>
                            <p className='text-xl'>Total Price: <span className='font-medium text-cyan-700'>${totalPrice}</span></p>
                        </div>
                        <div className='py-3 px-5'>
                            <button onClick={() => { nav('/cart'); dispatch(handleCartItems()) }} type="button" className="text-white bg-blue-700 border border-blue-700 hover:bg-white hover:text-blue-700 transition-all duration-500 cursor-pointer font-medium rounded-lg text-base px-5 py-2.5 w-full">View Cart</button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default CartItems
