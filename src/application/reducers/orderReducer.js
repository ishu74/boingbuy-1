const initialState = {
    orders: [], 
  };
  
  const reducers = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ORDERS':
        return {
          ...state,
          orders: action.payload, 
        };
      case 'ADD_ORDER':
        return {
          ...state,
          orders: [...state.orders, action.payload], 
        };
      default:
        return state;
    }
  };
  
  export default reducers;
  