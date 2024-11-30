import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCart } from '../../application/actions/cartaction';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cartReducer.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    paymentMethod: 'Credit Card',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // debugger
    if (!cart.length) {
      alert('Your cart is empty. Add items before checkout.');
      return;
    }

    const order = {
      id: Date.now(),
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      items: cart,
      total: getTotalPrice(),
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));
    navigate("/orders")

    toast.success(
      <div>
        <strong>Order Confirmed!</strong>
        <p>Name: {formData.name}</p>
        <p>Total: ${getTotalPrice()}</p>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

    dispatch(clearCart());
    setFormData({
      name: '',
      contact: '',
      email: '',
      address: '',
      paymentMethod: 'Credit Card',
    });
    navigate("/orders")
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Checkout</h1>
      <ToastContainer />
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <h4>Shipping Information</h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formName" className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formContact" className="mb-3">
                      <Form.Label>Contact No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="contact"
                        placeholder="Enter your contact number"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="address"
                    placeholder="Enter your shipping address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPaymentMethod" className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              <h4>Order Summary</h4>
            </Card.Header>
            <Card.Body>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <span>
                        {item.name} (x{item.quantity})
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>${getTotalPrice()}</strong>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
