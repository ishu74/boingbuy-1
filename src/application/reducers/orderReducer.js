const initialState = {
    orders: [], 
  };
  
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload,
      };

    case 'REMOVE_ORDER_SUCCESS':
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload), // Remove the order
      };
    case 'REMOVE_ORDER_ERROR':
      return state;
    default:
      return state;
  }
};

  
  export default reducers;
  