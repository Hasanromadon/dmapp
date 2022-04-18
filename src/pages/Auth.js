import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import ButtonDumbMerch from '../components/ButtonDumbMerch';
import { UserContext } from '../context/user/UserContext';

const Auth = () => {
  let navigate = useNavigate();
  const [auth, setAuth] = useState('login');
  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state.isLogin === true) {
      navigate('/');
    }
  }, [state.isLogin, navigate]);

  return (
    <Container className="auth-container">
      <Row>
        <Col xl md="6">
          <img
            className="auth-logo"
            src="assets/icons/dumbmerch-logo.svg"
            alt=""
          />
          <h3 className="my-3">Easy, Fast and Reliable </h3>
          <p>
            Go shopping for merchandise, just go to dumb merch shopping. the
            biggest merchandise in Indonesia
          </p>
          <div className="mt-5">
            <ButtonDumbMerch
              outlined={auth === 'register' ? true : false}
              to="/login"
              onClick={() => setAuth('login')}
            >
              Login
            </ButtonDumbMerch>
            <ButtonDumbMerch
              outlined={auth === 'login' ? true : false}
              to="/register"
              onClick={() => setAuth('register')}
            >
              Register
            </ButtonDumbMerch>
          </div>
        </Col>
        <Col md="6">
          {' '}
          <>
            {auth === 'login' ? <Login /> : <Register setAuth={setAuth} />}
          </>{' '}
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
