import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCart } from '../../application/actions/cartaction';
import { useNavigate } from 'react-router-dom';
import { getCarts } from '../../application/selectors/cartSelector';

const CheckoutPage = () => {
  const cart = useSelector(getCarts)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  // Form data and error states
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    paymentMethod: 'Credit Card',
  });

  const [errors, setErrors] = useState({
    nameError: '',
    contactError: '',
    emailError: '',
    addressError: '',
  });

 
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === 'name' && /[^a-zA-Z\s]/.test(value)) {
  //     return  
  //   }

  //   setFormData({
  //     ...formData,
  //     [name]: value, //e.target.value,
  //   });
  
  //   setErrors({
  //     ...errors,
  //     addressError:""
  //   })
  //   if (name === 'name') {
  //     setErrors({
  //       ...errors,
  //       nameError: '', // Clear address error when user types in the 'name' field
  //     });
  //   }

  //   if (name === 'email') {
  //     // const emailRegex = /\S+@\S+\.\S+/;
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (emailRegex.test(value)) {
  //       setErrors({
  //         ...errors,
  //         emailError: '' 
  //       });
  //     } else {
  //       setErrors({
  //         ...errors,
  //         emailError: 'Email format is not proper.' 
  //       });
        
  //     }
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'name' && /[^a-zA-Z\s]/.test(value)) {
      return;
    }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  
    setErrors({
      ...errors,
      addressError: "",
    });
  
    if (name === 'name') {
      setErrors({
        ...errors,
        nameError: '', // Clear name error when user types in the 'name' field
      });
    }
  
    if (name === 'email') {
      // Updated email validation regex: Only one dot allowed after @
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z0-9-.]+$/;
      const afterAt = value.split('@')[1];
      const dotCountAfterAt = afterAt ? afterAt.split('.').length - 1 : 0;
  
      // Check if there's more than one dot after '@'
      if (emailRegex.test(value) && dotCountAfterAt <= 1) {
        setErrors({
          ...errors,
          emailError: '', // Clear email error if valid
        });
      } else {
        setErrors({
          ...errors,
          emailError: 'Email format is not proper. Only one dot is allowed after "@"',
        });
      }
    }
  };
  
  
  const handleContactChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setFormData({
        ...formData,
        contact: value,

      });
      setErrors({
        ...errors,
        contactError: ''
      })
    }else{
      setErrors({
        ...errors,
        contactError: 'Please enter valid 10 digit phone number' 
      });
    }
  };


  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Validate the form and submit the order
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    let valid = true;
    let newErrors = {
      nameError: '',
      contactError: '',
      emailError: '',
      addressError: ''
    };

    if (!formData.name) {
      newErrors.nameError = 'Please enter your name.';
      valid = false;
    }

    // if (!formData.contact || !/^\d{10}$/.test(formData.contact)) {
    //   newErrors.contactError = 'Please enter a valid 10-digit contact number.';
    //   valid = false;
    // }

    if (!formData.contact || !/^\d{10}$/.test(formData.contact)) {
      newErrors.contactError = 'Please enter a valid 10-digit contact number.';
      valid = false;
    }

    // if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.emailError = 'Please enter a valid email address.';
    //   valid = false;
    // }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.emailError = 'Please enter a valid email address.';
      valid = false;
    }
    

    if (!formData.address) {
      newErrors.addressError = 'Please enter your shipping address.';
      valid = false;
    }

    setErrors(newErrors);

    // If valid, proceed with order submission
    if (valid) {
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
    }
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
                        isInvalid={!!errors.nameError}
                      />
                      {errors.nameError && <Form.Control.Feedback type="invalid">{errors.nameError}</Form.Control.Feedback>}
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
                        onChange={handleContactChange}
                        isInvalid={!!errors.contactError}
                      />
                      {errors.contactError && <Form.Control.Feedback type="invalid">{errors.contactError}</Form.Control.Feedback>}
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
                    isInvalid={!!errors.emailError}
                  />
                  {errors.emailError && <Form.Control.Feedback type="invalid">{errors.emailError}</Form.Control.Feedback>}
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
                    isInvalid={!!errors.addressError}
                  />
                  {errors.addressError && <Form.Control.Feedback type="invalid">{errors.addressError}</Form.Control.Feedback>}
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
