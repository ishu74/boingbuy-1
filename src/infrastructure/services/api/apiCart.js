
const fetchCart = () => {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error parsing cart from localStorage', error);
      return [];
    }
  };
  
  const addToCart = (product) => {
    try {
      const cart = fetchCart();
      const productIndex = cart.findIndex(item => item.id === product.id);
      if (productIndex >= 0) {
        cart[productIndex].quantity += 1;
      } else {
        product.quantity = 1; 
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart; 
    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  };
  
//   const removeFromCart = (id) => {

//     try {
//       let cart = fetchCart();
//       cart = cart.filter(item => item.id !== id); 
//       localStorage.setItem('cart', JSON.stringify(cart));
//       return cart; 
//     } catch (error) {
//       console.error('Error removing product from cart', error);
//     }
//   };
  

const removeFromCart = (id) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = cart.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); 
      return updatedCart;
    } catch (error) {
      console.error('Error removing product from cart in localStorage:', error);
    }
  };
  
  const deleteCart = () => {
    try {
      localStorage.removeItem('cart');
      return []; 
    } catch (error) {
      console.error('Error deleting cart', error);
    }
  };
  

//   const updateCartQuantity = (id, quantity) => {
//     try {
//       const cart = fetchCart();
//       const productIndex = cart.findIndex(item => item.id === id);
//       if (productIndex >= 0) {
//         cart[productIndex].quantity = quantity; 
//         localStorage.setItem('cart', JSON.stringify(cart));
//       }
//       return cart; 
//     } catch (error) {
//       console.error('Error updating product quantity in cart', error);
//     }
//   };

const updateCartQuantity = (id, quantity) => {
  try {
    // debugger
    if (quantity < 0) {
      console.error('Quantity cannot be negative.');
      return null;
    }

    const cart = fetchCart() || [];

 
    const productIndex = cart.findIndex(item => item.id === id);

    if (productIndex >= 0) {
     
      cart[productIndex].quantity = quantity;

      localStorage.setItem('cart', JSON.stringify(cart));

      return cart; 
    } else {
     
      console.warn(`Product with id ${id} not found in the cart.`);
      return cart; 
    }
  } catch (error) {
    console.error('Error updating product quantity in cart:', error);
    return null;
  }
};

const clearCart = () => {
  try {
    localStorage.removeItem('cart'); 
    return [];
  } catch (error) {
    console.error('Error clearing cart', error);
  }
};

const fetchOrders = () => {
  try {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    return orders;
  } catch (error) {
    console.error('Error fetching orders from localStorage:', error);
    return [];
  }
};
const removeOrder = (orderId) => {
  try {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = orders.filter(order => order.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    return updatedOrders;
  } catch (error) {
    console.error('Error removing order from localStorage:', error);
  }
};


  
  export default { fetchCart, addToCart, removeFromCart, deleteCart, updateCartQuantity,clearCart, removeOrder, fetchOrders };
  