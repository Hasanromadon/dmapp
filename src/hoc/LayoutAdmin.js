import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import NavbarLayout from '../components/NavbarAdmin';
import SideNavAdmin from '../components/SideNavAdmin';
import { UserContext } from '../context/user/UserContext';
const LayoutAdmin = ({ children }) => {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.isLogin && state.user.role !== 'admin') {
      navigate('/unauthorized');
    }
  }, [state.isLogin, navigate, state.user.role]);

  return (
    <>
      <NavbarLayout />
      <Container className="mt-5">
        <Row className="g-0">
          <SideNavAdmin />
          {children}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default LayoutAdmin;
