import React, { useState } from 'react';
import CardsData from '../data/CardData';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import { Link } from 'react-router-dom';

const Home = () => {
    const [cartData,setCartData] = useState(CardsData);
    const dispatch = useDispatch();

    return (
        <>
            <h1 className="text-center text-cyan-600 mb-6 text-5xl">Our Menu</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cartData.map((item) => (

                    <div key={item.id} className="p-4 max-w-lg bg-white border border-gray-200 rounded-lg shadow">
                        <Link to={`/cardDetails/${item.id}`}>
                            <div className="w-full h-[250px] aspect-square mb-4">
                                <img
                                    className="w-full h-full block rounded-lg"
                                    src={item.imgdata}
                                    alt={`${item.rname} image`}
                                />
                            </div>
                        </Link>
                        
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900">{item.rname}</h5>
                                <div className="flex bg-blue-100 items-center rounded-lg py-1 px-2 gap-1">
                                    <svg
                                        className="w-3 h-3 text-black"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <p className="text-black font-semibold rounded text-sm">{item.rating}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-gray-600">{item.address}</p>
                                <span className="text-xl font-bold text-gray-900">$ {item.price}</span>
                            </div>

                            <button
                                className="text-lg cursor-pointer text-white bg-blue-700 hover:bg-white hover:text-blue-700 border border-blue-700 transition-all duration-200 font-medium rounded-lg px-5 py-2.5 text-center w-full"
                                onClick={() => dispatch(addToCart(item))}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
};

export default Home;
