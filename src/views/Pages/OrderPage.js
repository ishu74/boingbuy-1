import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Collapse } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ShimmerTable } from 'shimmer-effects-react';
import 'react-toastify/dist/ReactToastify.css';
import { getLoadingState } from '../../application/selectors/uiReducer';
import { getOrders } from '../../application/selectors/orderSelector';
import { fetchOrders } from '../../application/actions/orderaction';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [openOrder, setOpenOrder] = useState(null);
  const dispatch = useDispatch();

  const loading = useSelector(getLoadingState);
  const fetchedOrders = useSelector(getOrders);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleToggle = (orderId) => {
    setOpenOrder(openOrder === orderId ? null : orderId);
  };

  const toggleOrderStatus = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, isActive: !order.isActive } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    toast.success('Order status updated!');
  };

  return (
    <Container style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '8px' }} className="mt-5">
      <h1 className="text-center mb-4" style={{ color: '#6f4f37' }}>Your Orders</h1>
      {loading ? (
        <ShimmerTable
          mode="light"
          row={5}
          col={10}
          border={1}
          borderColor="#F0F0F0"
          rounded={0.25}
          rowGap={15}
          colGap={10}
          colPadding={[10, 15, 10, 15]}
        />
      ) : orders.length === 0 ? (
        <p className="text-center" style={{ color: '#6f4f37' }}>No orders have been placed yet.</p>
      ) : (
        <Table responsive="sm" striped bordered hover style={{ backgroundColor: '#fff', borderRadius: '8px' }}>
          <thead style={{ backgroundColor: '#6f4f37', color: 'white' }}>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Payment Method</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.name}</td>
                  <td>{order.contact}</td>
                  <td>{order.email}</td>
                  <td>{order.address}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <Button
                      variant="link"
                      onClick={() => handleToggle(order.id)}
                      style={{
                        backgroundColor: '#f2f2f2',
                        color: '#6f4f37',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      {openOrder === order.id ? 'Hide Items' : 'View Items'}
                    </Button>
                  </td>
                  <td>${order.total}</td>
                  <td>{order.isActive ?  'Cancelled' : 'Confirmed' }</td>
                  <td>
                    <Button
                      variant={order.isActive ? 'warning' : 'success'}
                      onClick={() => toggleOrderStatus(order.id)}
                      style={{
                        color: 'white',
                        border: 'none',
                        fontWeight: 'bold',
                      }}
                    >
                      {/* {order.isActive ? 'Deactivate' : 'Activate'} */}
                      {order.isActive ? 'Confirm' : 'Cancel' }
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="11" style={{ padding: '0' }}>
                    <Collapse in={openOrder === order.id}>
                      <div>
                        <Table
                          responsive="sm"
                          style={{
                            marginTop: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                          }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: '#6f4f37', color: 'white' }}>
                              <th>Item Name</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item) => (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>${item.price * item.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrdersPage;

// import React, { useEffect, useState } from 'react';
// import { Container, Table, Button, Collapse } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { ShimmerTable } from 'shimmer-effects-react';
// import 'react-toastify/dist/ReactToastify.css';
// import { getLoadingState } from '../../application/selectors/uiReducer';
// import { getOrders } from '../../application/selectors/orderSelector';
// import { fetchOrders, deleteOrder } from '../../application/actions/orderaction';

// const OrdersPage = () => {
//   const [openOrder, setOpenOrder] = useState(null);
//   const dispatch = useDispatch();

//   const loading = useSelector(getLoadingState);
//   const orders = useSelector(getOrders);
//   const deleteOrderHandler = (orderId) => {
//     dispatch(deleteOrder(orderId));
//     toast.success('Order successfully deleted!');
//   };
//   useEffect(() => {
//     debugger
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   const handleToggle = (orderId) => {
//     setOpenOrder(openOrder === orderId ? null : orderId);
//   };

//   const handleDeleteOrder = (orderId) => {
//     debugger
//     const toastId = toast(
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <span style={{ marginBottom: '10px' }}>Are you sure you want to delete this order?{orderId}</span>
//         <div>
//           <Button
//             variant="danger"
//             size="sm"
//             onClick={() => {
//               deleteOrderHandler(orderId); 
//               toast.dismiss(toastId); 
//             }}
//             style={{ marginRight: '10px' }}
//           >
//             Confirm
//           </Button>
//           <Button variant="secondary" size="sm" onClick={() => toast.dismiss(toastId)}>
//             Cancel
//           </Button>
//         </div>
//       </div>,
//       {
//         position: 'top-right',
//         autoClose: false,
//         closeOnClick: false,
//         draggable: false,
//         progress: undefined,
//       }
//     );
//   };



//   return (
//     <Container style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '8px' }} className="mt-5">
//       <h1 className="text-center mb-4" style={{ color: '#6f4f37' }}>Your Orders</h1>
//       {loading ? (
//         <ShimmerTable
//           mode="light"
//           row={5}
//           col={10}
//           border={1}
//           borderColor="#F0F0F0"
//           rounded={0.25}
//           rowGap={15}
//           colGap={10}
//           colPadding={[10, 15, 10, 15]}
//         />
//       ) : !orders || orders.length === 0 ? (
//         <p className="text-center" style={{ color: '#6f4f37' }}>No orders have been placed yet.</p>
//       ) : (
//         <Table responsive="sm" striped bordered hover style={{ backgroundColor: '#fff', borderRadius: '8px' }}>
//           <thead style={{ backgroundColor: '#6f4f37', color: 'white' }}>
//             <tr>
//               <th>Order ID</th>
//               <th>Date</th>
//               <th>Name</th>
//               <th>Contact</th>
//               <th>Email</th>
//               <th>Address</th>
//               <th>Payment Method</th>
//               <th>Items</th>
//               <th>Total</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <React.Fragment key={order.id}>
//                 <tr>
//                   <td>{order.id}</td>
//                   <td>{order.date}</td>
//                   <td>{order.name}</td>
//                   <td>{order.contact}</td>
//                   <td>{order.email}</td>
//                   <td>{order.address}</td>
//                   <td>{order.paymentMethod}</td>
//                   <td>
//                     <Button
//                       variant="link"
//                       onClick={() => handleToggle(order.id)}
//                       style={{
//                         backgroundColor: '#f2f2f2',
//                         color: '#6f4f37',
//                         border: 'none',
//                         fontWeight: 'bold',
//                         cursor: 'pointer',
//                       }}
//                     >
//                       {openOrder === order.id ? 'Hide Items' : 'View Items'}
//                     </Button>
//                   </td>
//                   <td>${order.total}</td>
//                   <td>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleDeleteOrder(order.id)}
//                       style={{
//                         backgroundColor: '#d9534f',
//                         color: 'white',
//                         border: 'none',
//                         fontWeight: 'bold',
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td colSpan="10" style={{ padding: '0' }}>
//                     <Collapse in={openOrder === order.id}>
//                       <div>
//                         <Table
//                           responsive="sm"
//                           style={{
//                             marginTop: '10px',
//                             backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                             borderRadius: '8px',
//                           }}
//                         >
//                           <thead>
//                             <tr style={{ backgroundColor: '#6f4f37', color: 'white' }}>
//                               <th>Item Name</th>
//                               <th>Quantity</th>
//                               <th>Price</th>
//                               <th>Total</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {order.items.map((item) => (
//                               <tr key={item.id}>
//                                 <td>{item.name}</td>
//                                 <td>{item.quantity}</td>
//                                 <td>${item.price}</td>
//                                 <td>${item.price * item.quantity}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </Table>
//                       </div>
//                     </Collapse>
//                   </td>
//                 </tr>
//               </React.Fragment>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// };

// export default OrdersPage;
