import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout'
import Cart from './components/Cart';
import CardDetails from './components/CardDetails';
import Home from './components/Home';
import { store } from './redux/store';
import { Provider } from 'react-redux';

function App() {
  let routers = createBrowserRouter([
    {path:'', element:<Layout/> ,children:[
      {index:true , element:<Home/>},
      {path:'cart', element:<Cart/>},
      {path:'cardDetails/:productId', element:<CardDetails/>},
    ]}
  ])
  return (
    <>
    <Provider store={store}>
      <RouterProvider router={routers}></RouterProvider>
      <ToastContainer />
    </Provider>
    </>
  )
}

export default App
