import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Cards = ({ product }) => {
  return (
    <Card className="product-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={product.image} alt={product.name} className="product-image" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          Brand: {product.brand} <br />
          Price: ${product.price}
        </Card.Text>
        <Link to={`/products/${product.id}`} className="btn btn-primary">
        <Button variant="primary">View Product</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Cards