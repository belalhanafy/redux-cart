import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardsData from '../data/CardData';
import { addToCart, decreaseQuantity, deleteProduct, increaseQuantity } from '../redux/CartSlice';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';

const CardDetails = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { productId } = useParams();

    // Find the product in the cart and CardsData
    const productInCart = cart.find((item) => item.id === parseInt(productId));
    const productInCards = CardsData.find((item) => item.id === parseInt(productId));

    return (
        <>
            <h2 className="text-center text-cyan-400 text-5xl mb-11">Item Details</h2>
            <div className="grid place-content-center">
                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img
                        className="object-cover w-full rounded-t-lg h-full md:w-48 md:rounded-none md:rounded-s-lg"
                        src={productInCards.imgdata}
                        alt={productInCards.rname}
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {productInCards.rname}
                        </h2>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Address: {productInCards.address}
                        </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Order Review: ${productInCards.somedata}
                        </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Price: ${productInCards.price}
                        </p>
                        {productInCart ? (
                            <>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Quantity: {productInCart.qnty}
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Total Price: ${productInCart.price * productInCart.qnty}
                                </p>
                                <div className='flex gap-6'>
                                    <div className='flex items-center'>

                                        {productInCart.qnty === 1 ? (
                                            <button
                                                disabled
                                                onClick={() => dispatch(decreaseQuantity(productInCart))}
                                                className="bg-gray-200 cursor-not-allowed p-2 rounded w-8 h-8 flex items-center justify-center"
                                            >
                                                <FaMinus />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => dispatch(decreaseQuantity(productInCart))}
                                                className=" bg-gray-200 p-2 rounded w-8 h-8 flex items-center justify-center"
                                            >
                                                <FaMinus />
                                            </button>
                                        )}
                                        <input
                                            type="text"
                                            className="w-8 h-8 text-center mx-2 border rounded"
                                            value={productInCart.qnty}
                                            disabled
                                        />

                                        <button
                                            onClick={() => dispatch(increaseQuantity(productInCart))}
                                            className="bg-gray-200 p-2 rounded w-8 h-8 flex items-center justify-center"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => dispatch(deleteProduct(productInCart))}
                                        className="w-8 h-8 text-red-600 bg-red-200 rounded-md flex items-center justify-center"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => dispatch(addToCart(productInCards))}
                                    className="text-white bg-blue-700 hover:bg-blue-800 transition-all duration-300 rounded-lg px-4 py-2"
                                >
                                    Add to Cart
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardDetails;
