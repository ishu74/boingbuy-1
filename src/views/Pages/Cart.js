import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../../application/actions/cartaction';

const Cart = () => {
  const cart = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();

  const [inputQuantity, setInputQuantity] = useState({});

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id)); 
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) return;  
    dispatch(updateCartQuantity(id, quantity));  
  };

  const handleQuantityChange = (id, e) => {
    const newQuantity = e.target.value;
    if (newQuantity >= 0) {
      setInputQuantity((prev) => ({
        ...prev,
        [id]: newQuantity, 
      }));
      handleUpdateQuantity(id, newQuantity); 
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>Price: ${item.price}</p>

              <div>
                <input
                  type="number"
                  value={inputQuantity[item.id] || item.quantity}  
                  onChange={(e) => handleQuantityChange(item.id, e)} 
                  min="1"  
                />
              </div>

              <Button onClick={() => handleRemoveFromCart(item.id)} variant="danger">
                Remove from Cart
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
