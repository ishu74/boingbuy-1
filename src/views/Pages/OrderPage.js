import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders have been placed yet.</p>
      ) : (
        <Row>
          {orders.map((order) => (
            <Col md={6} key={order.id} className="mb-4">
              <Card>
                <Card.Header>
                  <strong>Order ID:</strong> {order.id}
                </Card.Header>
                <Card.Body>
                  <p>
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p>
                    <strong>Name:</strong> {order.name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {order.contact}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                  <h5>Items:</h5>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} (x{item.quantity}) - ${item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                  <h5>Total: ${order.total}</h5>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OrdersPage;
