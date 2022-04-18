import React, { useContext } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/user/UserContext';
import SearchInput from './SearchInput';
const NavbarLayout = ({ handleSearchSubmit }) => {
  const location = useLocation();
  const { pathname } = location;
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
    toast('Logout Success');
    navigate('/auth');
  };

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split('/');
  return (
    <>
      <Navbar variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              className="nav-logo"
              src="/assets/icons/dumbmerch-logo.svg"
              alt="dumbmerch logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Row className="g-0 ms-md-4 mt-3 sm-mt-0 w-100">
            <Col md={10}>
              <SearchInput handleSearchSubmit={handleSearchSubmit} />
            </Col>
          </Row>
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav className="me-0">
              {state.isLogin && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    className={
                      splitLocation[1] === 'cart'
                        ? 'fw-bold text-red-primary'
                        : 'fw-bold text-white'
                    }
                  >
                    Cart
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/complain"
                    className={
                      splitLocation[1] === 'complain'
                        ? 'fw-bold text-red-primary'
                        : 'fw-bold text-white'
                    }
                  >
                    Complain
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/profile/order"
                    className={
                      splitLocation[1] === 'profile'
                        ? 'fw-bold text-red-primary'
                        : 'fw-bold text-white'
                    }
                  >
                    Profile
                  </Nav.Link>
                </>
              )}

              {state.isLogin ? (
                <>
                  <Nav.Link
                    onClick={() => handleLogout()}
                    className="fw-bold text-white"
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/auth" className="fw-bold text-white">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container></Container>
    </>
  );
};

export default NavbarLayout;
