import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/user/UserContext';

const NavbarAdmin = () => {
  const location = useLocation();
  const { pathname } = location;
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast('Logout Success');
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/auth');
  };

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split('/');
  return (
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
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            <Nav.Link
              as={Link}
              to="/admin/complain"
              className={
                splitLocation[2] === 'complain'
                  ? 'fw-bold text-red-primary'
                  : 'fw-bold text-white'
              }
            >
              Complain
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/orders"
              className={
                splitLocation[1] === 'admin' && splitLocation[2] !== 'complain'
                  ? 'fw-bold text-red-primary'
                  : 'fw-bold text-white'
              }
            >
              Seller Center
            </Nav.Link>
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
  );
};

export default NavbarAdmin;
