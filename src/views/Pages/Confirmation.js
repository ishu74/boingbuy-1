import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  // Retrieving the order details from local storage
  const order = JSON.parse(localStorage.getItem('orders')).slice(-1)[0]; // Get the latest order

  const handleGoHome = () => {
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/'); // Change to your shop page route
  };

  return (
    <Container className="mt-5">
      <ToastContainer />
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="border-0 shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4">Order Confirmation</h2>
              <div className="text-center mb-4">
                <h4>Thank you for your purchase, {order.name}!</h4>
                <p>Your order has been successfully placed. Here are your order details:</p>
              </div>

              <div className="mb-4">
                <h5>Order Summary</h5>
                <ul className="list-unstyled">
                  <li><strong>Order ID:</strong> {order.id}</li>
                  <li><strong>Shipping Address:</strong> {order.address}</li>
                  <li><strong>Email:</strong> {order.email}</li>
                  <li><strong>Contact No.:</strong> {order.contact}</li>
                  <li><strong>Payment Method:</strong> {order.paymentMethod}</li>
                </ul>
              </div>

              {/* <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Total: ${order.total}</h5>
                <Button variant="primary" onClick={handleGoHome}>Go to Homepage</Button>
              </div> */}

              <div className="text-center">
                <Button variant="secondary" onClick={handleContinueShopping}>
                  Continue Shopping
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmationPage;
