import { 
    ADD_TO_CART, ADD_TO_CART_SUCCESS, addToCartSuccess, 
    REMOVE_FROM_CART, REMOVE_FROM_CART_SUCCESS, removeFromCartSuccess, 
    DELETE_CART, DELETE_CART_SUCCESS, deleteCartSuccess, 
    UPDATE_CART_QUANTITY, UPDATE_CART_QUANTITY_SUCCESS, updateCartQuantitySuccess, 
    fetchCartSuccess
  } from "../actions/cartaction";
//   import { setLoading } from "../actions/uiAction";
//   import * as uiActions from '../actions/uiAction';
  
  const fetchCartMiddleware = ({ api }) => ({ dispatch }) => (next) => (action) => {
    if (action.type === 'FETCH_CART') {
      try {
        // dispatch(uiActions.setLoading(true)); 
        const cart = api.apiCart.fetchCart(); 
        dispatch(fetchCartSuccess(cart)); 
        // dispatch(uiActions.setLoading(false)); 
      } catch (error) {
        console.log("Fetch Cart Error", error);
      }
    }
    next(action);
  };
  
  const addToCartMiddleware = ({ api }) => ({ dispatch }) => (next) => (action) => {
    if (action.type === ADD_TO_CART) {
      try {
        // dispatch(setLoading(true)); 
        const addedProduct = api.apiCart.addToCart(action.payload);
        dispatch(addToCartSuccess(addedProduct));
        // dispatch(setLoading(false)); 
      } catch (error) {
        console.log("Add to Cart Error", error);
      }
    }
    next(action);
  };
  
  const removeFromCartMiddleware = ({ api }) => ({ dispatch }) => (next) => (action) => {
    if (action.type === REMOVE_FROM_CART) {
      try {
        api.apiCart.removeFromCart(action.payload);
        dispatch(removeFromCartSuccess(action.payload)); 
      } catch (error) {
        console.log("Remove from Cart Error", error);
      }
    }
    next(action);
  };
  
  const deleteCartMiddleware = ({ api }) => ({ dispatch }) => (next) => (action) => {
    if (action.type === DELETE_CART) {
      try {
        api.apiCart.deleteCart(); 
        dispatch(deleteCartSuccess());
      } catch (error) {
        console.log("Delete Cart Error", error);
      }
    }
    next(action);
  };
  
  const updateCartQuantityMiddleware = ({ api }) => ({ dispatch }) => (next) => (action) => {
    if (action.type === UPDATE_CART_QUANTITY) {
      try {
        const updatedProduct = api.apiCart.updateCartQuantity(action.payload.id, action.payload.quantity); 
        dispatch(updateCartQuantitySuccess(updatedProduct)); 
      } catch (error) {
        console.log("Update Cart Quantity Error", error);
      }
    }
    next(action);
  };
  
  export default [
    fetchCartMiddleware, 
    addToCartMiddleware, 
    removeFromCartMiddleware, 
    deleteCartMiddleware, 
    updateCartQuantityMiddleware
  ];
  