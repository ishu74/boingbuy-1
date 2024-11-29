import React, { useEffect } from 'react';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateCartQuantity, updateCartQuantitySuccess } from '../../application/actions/cartaction';
import { Link } from 'react-router-dom';

const Cart = () => {
    const cart = useSelector((state) => state.cartReducer.cart);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);


    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    //   const handleUpdateQuantity = (id, quantity) => {
    //     if (quantity <= 0) return;  
    //     dispatch(updateCartQuantity(id, quantity)); 
    //   };


    const handleUpdateQuantity = (id, quantity) => {
        if (quantity <= 0) return;

        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
        );
        dispatch(updateCartQuantitySuccess({ id, quantity }));
        const updatedCartInLocalStorage = updatedCart.map((item) => ({
            ...item,
            quantity: item.id === id ? quantity : item.quantity,
        }));
        localStorage.setItem('cart', JSON.stringify(updatedCartInLocalStorage));
        dispatch(updateCartQuantity(id, quantity));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center">Your cart is empty!</p>
            ) : (
                <Row>
                    {/* Cart Items (Left Side) */}
                    <Col md={8}>
                        {cart.map((item) => (
                            <Card className="mb-3" key={item.id}>
                                <Card.Body className="d-flex">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="img-thumbnail me-3"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                    <div className="flex-grow-1">
                                        <h5>{item.name}</h5>
                                        <p className="mb-1">Price: ${item.price}</p>
                                        <div className="d-flex align-items-center">
                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2">Quantity: {item.quantity}</span>
                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                    <Button
                                        variant="danger"
                                        className="sm"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>

                    {/* Cart Summary (Right Side) */}
                    <Col md={4}>
                        <Card>
                            <Card.Header>
                                <h4>Cart Summary</h4>
                            </Card.Header>
                            <Card.Body>
                                <p>Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
                                <h5>Total Price: ${getTotalPrice()}</h5>
                                <Link to="/checkout">
                                    <Button variant="success" className="w-100 mt-3">
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Cart;
