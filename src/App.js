import logo from './logo.svg';
import './App.css';
import ProductListing from './views/Pages/ProductListing';
import NavBar from './views/Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductDetails from './views/Pages/ProductDetails';
import Cart from './views/Pages/Cart';
import { useEffect } from 'react';
import { fetchCart, fetchCartSuccess } from './application/actions/cartaction';
import { useDispatch } from 'react-redux';
import Checkout from './views/Pages/Checkout';
import OrderPage from './views/Pages/OrderPage';
import { ToastContainer } from 'react-toastify';
import { fetchOrderSuccess } from './application/actions/orderaction';

function App() {
const dispatch = useDispatch()
  useEffect(() => {
    const cart = fetchCartSuccess()
    const order = fetchOrderSuccess()
    dispatch(fetchCart(cart))
    dispatch(fetchOrderSuccess(order))
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route path="/products" element={<ProductListing />} />
          <Route path="/" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/orders" element={<OrderPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
