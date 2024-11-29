import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../assets/product';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../application/actions/cartaction';
// import { addToCart } from '../../actions/cartActions'; // Make sure this action is correctly imported

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const productId = parseInt(id, 10);
    let productDetail;

    products.categories.forEach(category => {
        category.subcategories.forEach(subcategory => {
            const product = subcategory.products.find(product => product.id === productId);
            if (product) productDetail = product;
        });
    });

    if (!productDetail) {
        return <h2>Product not found!</h2>;
    }



    const handleAddToCart = () => {
        // debugger
        dispatch(addToCart(productDetail));
        alert(`${productDetail.name} has been added to the cart.`);
    };

    return (
        <div className="product-detail">
            <img src={productDetail.image} alt={productDetail.name} />
            <h1>{productDetail.name}</h1>
            <p>Price: ${productDetail.price}</p>
            <p>Brand: {productDetail.brand}</p>
            <p>{productDetail.description}</p> {/* You can use productDetail.description if available */}

            <Button className="btn btn-success" onClick={handleAddToCart}>
                Add to Cart
            </Button>
        </div>
    );
};

export default ProductDetails;
