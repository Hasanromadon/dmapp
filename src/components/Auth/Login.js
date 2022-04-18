import React, { useContext, useEffect, useState } from 'react';
import {
  Col,
  Container,
  Form,
  Row,
  FloatingLabel,
  Alert,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import ButtonDumbMerch from '../ButtonDumbMerch';
import { useMutation } from 'react-query';
import { API, setAuthToken } from '../../config/api';
import { UserContext } from '../../context/user/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Sorry the email is required')
        .email('This is invalid email'),
      password: Yup.string().required('Sorry the password is required'),
    }),
    onSubmit: (values) => {
      handleSubmit.mutate(values);
    },
  });

  const handleSubmit = useMutation(async (values) => {
    try {
      setLoading(true);

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(values);

      const response = await API.post('/auth/login', body, config);
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data,
        });
      }
      toast('Success Login!');
      setLoading(false);
    } catch (error) {
      setError('Invalid email or password');
      setLoading(false);
    }
  });

  useEffect(() => {
    if (state.isLogin) {
      setAuthToken(localStorage.getItem('token'));

      if (state.user.role === 'admin') {
        navigate('/admin/report');
      } else {
        navigate('/');
      }
    }
  }, [state]);

  return (
    <div className="form-container position-relative p-4 w-75 ">
      <img
        className="position-absolute bg-dot-small"
        src="/assets/icons/dot-yellow.svg"
        alt=""
      />
      <p className="fs-4 text fw-bold">Login</p>
      {error && (
        <div className="text-center">
          <p className="text-danger">Wrong Password or Email</p>
        </div>
      )}
      <Form onSubmit={formik.handleSubmit}>
        <FloatingLabel
          controlId="emailInput"
          label="Email"
          className="mb-3 text-dark p-0"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            {...formik.getFieldProps('email')}
          />
          {formik.errors.email ? (
            <small className="text-danger">{formik.errors.email}</small>
          ) : null}
        </FloatingLabel>
        <FloatingLabel
          controlId="passwordInput"
          label="Password"
          className="mb-3 text-dark"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            {...formik.getFieldProps('password')}
          />
          {formik.errors.password ? (
            <small className="text-danger">{formik.errors.password}</small>
          ) : null}
        </FloatingLabel>
        <div className="mb-3 text-end">
          <Link className="link-light text-decoration-none " to="/reset">
            Forgot password?
          </Link>
        </div>
        <ButtonDumbMerch type="submit" full loading={loading}>
          Login
        </ButtonDumbMerch>
      </Form>
      <img
        className="position-absolute bg-dot-big"
        src="/assets/icons/dot-big.svg"
        alt=""
      />
    </div>
  );
};

export default Login;
