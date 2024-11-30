import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../../assets/product';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../application/actions/cartaction';
import { toast } from 'react-toastify';
import { getCarts } from '../../application/selectors/cartSelector';
// import { addToCart } from '../../actions/cartActions'; // Make sure this action is correctly imported

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const carts = useSelector(getCarts);
    const productId = parseInt(id, 10);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const navigate = useNavigate()
    let productDetail;

    products.categories.forEach(category => {
        category.subcategories.forEach(subcategory => {
            const product = subcategory.products.find((product) => product.id === productId);
            if (product) productDetail = product;
        });
    });

    if (!productDetail) {
        return <h2>Product not found!</h2>;
    }

    const handleAddToCart = () => {
        const isProductInCart = carts.some((item) => item.id === productDetail.id);

        if (isProductInCart) {
            // setIsAddedToCart(false);

            toast.info('Product is already in the cart!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {

            dispatch(addToCart(productDetail));
            setIsAddedToCart(true);
            toast.success('Product added to cart!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    };


    const handleGoToCart = () => {
        navigate('/cart');
    };
    return (
        <div className="product-detail">
            <img src={productDetail.image} alt={productDetail.name} />
            <h1>{productDetail.name}</h1>
            <p>Price: ${productDetail.price}</p>
            <p>Brand: {productDetail.brand}</p>
            <p>Velit mollit eu incididunt incididunt irure reprehenderit. Nulla incididunt quis proident est
                occaecat sunt adipisicing. Non tempor officia pariatur magna aliqua quis fugiat Lorem amet
                non in quis ad. Lorem eiusmod voluptate cillum eu culpa. Laborum ea do Lorem ea qui eiusmod
                excepteur enim exercitation laboris. Culpa velit consequat dolor elit do nostrud laborum est
                aliquip est reprehenderit ipsum dolore. Qui sint aliqua duis esse.
            </p>

            {/* <Button className="btn btn-success" onClick={handleAddToCart}>
                Add to Cart
            </Button> */}

            {!isAddedToCart ? (
                <Button className="btn btn-success" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            ) : (
                <Button className="btn btn-primary" onClick={handleGoToCart}>
                    Go to Cart
                </Button>
            )}
        </div>
    );
};

export default ProductDetails;

