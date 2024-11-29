import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Card, Container } from 'react-bootstrap';

const OrderPage = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderReducer.orders); 

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    dispatch({ type: 'SET_ORDERS', payload: savedOrders }); 
  }, [dispatch]);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found. Start shopping now!</p>
      ) : (
        <Card>
          <Card.Body>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Total Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.id}</td>
                    <td>
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          {item.name} (x{item.quantity})
                        </div>
                      ))}
                    </td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default OrderPage;
