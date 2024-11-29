const initialState = {
    cart: [], 
    loading: false, 
  };
  
  const reducers = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOADING':
        return { ...state, loading: true };
  
      case 'FETCH_CART_SUCCESS':
        return { ...state, cart: action.payload, loading: false };
  
      case 'ADD_TO_CART_SUCCESS':
        return { ...state, cart: [...state.cart, action.payload] };
  
      case 'REMOVE_FROM_CART_SUCCESS':
        return {
          ...state,
          cart: state.cart.filter((product) => product.id !== action.payload),
        };
  
      case 'DELETE_CART_SUCCESS':
        return { ...state, cart: [] };
  
      case 'UPDATE_CART_QUANTITY_SUCCESS':
        return {
          ...state,
          cart: state.cart.map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: action.payload.quantity }
              : product
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default reducers;
  