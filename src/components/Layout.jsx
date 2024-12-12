import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import CartItems from './CartItems'

const Layout = () => {
  return (<>
    <Header/>

    <div className='max-w-screen-xl mt-2 container mx-auto px-5 pt-2 pb-20'>
      <Outlet></Outlet>
    </div>
      <CartItems/>

  </>
  )
}

export default Layout