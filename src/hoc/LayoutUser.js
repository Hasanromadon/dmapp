import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import NavbarLayout from '../components/NavbarLayout';
import SideNavUser from '../components/SideNavUser';
import Footer from '../components/Footer';
import { UserContext } from '../context/user/UserContext';
import { useNavigate } from 'react-router-dom';
const LayoutUser = ({ children, wishlist }) => {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.isLogin) {
      navigate('/');
    }
  }, [state.isLogin, navigate]);
  return (
    <>
      <NavbarLayout />
      <Container className="mt-5">
        <Row className="g-0">
          <SideNavUser wishlist={wishlist} />
          {children}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default LayoutUser;
