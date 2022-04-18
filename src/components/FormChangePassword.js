import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API, apiHeader } from '../config/api';
import ButtonDumbMerch from './ButtonDumbMerch';

const FormChangePassword = ({ state, dispatch }) => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (value) => {
    try {
      const response = await API.patch('/auth/password', value, apiHeader);

      if (response.status === 200) {
        dispatch({
          type: 'LOGOUT',
        });
        navigate('/auth');
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Row className="g-0">
      <Col md={8}>
        {error && 'your current password wrong'}
        <form onSubmit={formik.handleSubmit}>
          <FloatingLabel
            controlId="currentPassword"
            label="Current Password"
            className="mb-3 text-dark p-0"
          >
            <Form.Control
              type="password"
              placeholder="current password"
              {...formik.getFieldProps('oldPassword')}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="newPassword"
            label="New Password"
            className="mb-3 text-dark p-0"
          >
            <Form.Control
              type="password"
              placeholder="new password"
              {...formik.getFieldProps('newPassword')}
            />
          </FloatingLabel>
          <div className="d-grid mb-5">
            <ButtonDumbMerch type="submit" variant="success fw-bold">
              Change Password
            </ButtonDumbMerch>
          </div>
        </form>
      </Col>
    </Row>
  );
};

export default FormChangePassword;
