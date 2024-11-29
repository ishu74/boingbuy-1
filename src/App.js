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

function App() {
const dispatch = useDispatch()
  useEffect(() => {
    // const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // dispatch(fetchCartSuccess(cart)); // Make sure cart data is stored in Redux
    const cart = fetchCartSuccess()
    dispatch(fetchCart(cart))
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/products" element={<ProductListing />} />
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
