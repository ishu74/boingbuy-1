export const FETCH_ORDERS = "FETCH_ORDERS";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const DELETE_ORDER = "DELETE_ORDER"
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS"


export const fetchOrders = () => ({
    type: FETCH_ORDERS,
  
  });
export const fetchOrderSuccess = (orders) => ({
    type: FETCH_ORDERS_SUCCESS,
    payload: orders,
  });
  

  
  export const deleteOrder = (id) => ({
    type: DELETE_ORDER,
    payload:id
  });
  
  export const deleteOrderSuccess = (id) => ({
    type: DELETE_ORDER_SUCCESS,
    payload:id
  });
  