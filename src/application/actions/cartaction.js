export const FETCH_CART = "FETCH_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DELETE_CART = "DELETE_CART";
export const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const REMOVE_FROM_CART_SUCCESS = "REMOVE_FROM_CART_SUCCESS";
export const DELETE_CART_SUCCESS = "DELETE_CART_SUCCESS";
export const UPDATE_CART_QUANTITY_SUCCESS = "UPDATE_CART_QUANTITY_SUCCESS";




export const fetchCartSuccess = (cart) => ({
    type: FETCH_CART_SUCCESS,
    payload: cart,
  });
  
  export const addToCartSuccess = (product) => ({
    type: ADD_TO_CART_SUCCESS,
    payload: product,
  });
  
  export const removeFromCartSuccess = (id) => ({
    type: REMOVE_FROM_CART_SUCCESS,
    payload: id,
  });
  
  export const deleteCartSuccess = () => ({
    type: DELETE_CART_SUCCESS,
  });
  
  export const updateCartQuantitySuccess = (updatedProduct) => ({
    type: UPDATE_CART_QUANTITY_SUCCESS,
    payload: updatedProduct,
  });
  
  
  export const fetchCart = () => ({
    type: FETCH_CART,
    // payload: JSON.parse(localStorage.getItem('cart')) || [],
  });
  
  export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
  });
  
  export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    payload: id,
  });
  
  export const deleteCart = () => ({
    type: DELETE_CART,
  });
  
  export const updateCartQuantity = (id, quantity) => ({
    type: UPDATE_CART_QUANTITY,
    payload: { id, quantity },
  });
  