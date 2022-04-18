import React, { useEffect, useState } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import ButtonDumbMerch from '../ButtonDumbMerch';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../config/api';
import { useMutation } from 'react-query';

const Register = ({ setAuth }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Sorry the name is required'),
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

      const response = await API.post('/auth/register', body, config);
      if (response?.status === 200) {
        // Send data to useContext
        toast('Success register!');
        setAuth('login');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast('Cant register! / Email already exist');
    }
  });

  return (
    <div className="form-container position-relative p-4 w-75 ">
      <img
        className="position-absolute bg-dot-small"
        src="/assets/icons/dot-yellow.svg"
        alt=""
      />
      <p className="fs-4 text fw-bold">Register</p>
      <Form onSubmit={formik.handleSubmit}>
        <FloatingLabel
          controlId="nameInput"
          label="Name"
          className="mb-3 text-dark p-0"
        >
          <Form.Control
            type="text"
            placeholder="name"
            {...formik.getFieldProps('name')}
          />
          {formik.errors.name ? (
            <small className="text-danger">{formik.errors.name}</small>
          ) : null}
        </FloatingLabel>
        <FloatingLabel
          controlId="EmailInput"
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
          controlId="password"
          label="Password"
          className="mb-3 text-dark"
        >
          <Form.Control
            type="password"
            placeholder="password"
            {...formik.getFieldProps('password')}
          />
          {formik.errors.password ? (
            <small className="text-danger">{formik.errors.password}</small>
          ) : null}
        </FloatingLabel>
        <ButtonDumbMerch type="submit" loading={loading} full>
          Register
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

export default Register;
