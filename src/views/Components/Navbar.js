import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

function NavBar() {

  const cart = useSelector((state) => state.cartReducer.cart);
  const cartItemCount = cart.length;
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top shadow" style={{ padding: '0.5rem 1rem' }}>
      <Container fluid>
        {/* Logo and Brand */}
        <Navbar.Brand as={Link} to="/products" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          BoingBuy
        </Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {/* Links for Products and Cart */}
            <Nav.Link as={Link} to="/products" style={{ fontSize: '1rem', marginLeft: '1rem' }}>
              Products
            </Nav.Link>


            {/* Disabled link for Orders */}
            <Nav.Link as={Link} to="/orders" style={{ fontSize: '1rem', marginLeft: '1rem' }}>
              Orders
            </Nav.Link>
          </Nav>

          {/* Cart Icon with margin from right */}

          {/* <div className="d-flex align-items-center" style={{ marginLeft: 'auto' }}>
          <Nav.Link as={Link} to="/cart" style={{ fontSize: '1rem', marginLeft: '1rem' }}>
          <CiShoppingCart style={{ fontSize: '1.5rem', marginRight: '1rem' }} />
            </Nav.Link>
          
          </div> */}

          <div className="d-flex align-items-center" style={{ marginLeft: 'auto' }}>
            {/* Cart Link */}
            <Nav.Link as={Link} to="/cart" style={{ fontSize: '1rem', marginLeft: '1rem' }}>
              <div className="position-relative">
                {/* Cart Icon */}
                <CiShoppingCart style={{ fontSize: '1.5rem', marginRight: '1rem' }} />

                {/* Conditionally render the badge if there are items in the cart */}
                {cartItemCount > 0 && (
                  <span
                    className="badge rounded-circle bg-black position-absolute"
                    style={{
                      top: '-5px',
                      right: '-5px',
                      padding: '5px 10px',
                      fontSize: '12px',
                    }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
