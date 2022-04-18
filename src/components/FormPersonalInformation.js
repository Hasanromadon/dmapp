import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import ButtonDumbMerch from './ButtonDumbMerch';

import { useMutation } from 'react-query';
import { API, apiHeader } from '../config/api';
import { toast } from 'react-toastify';

const FormPersonalInformation = ({ state, dispatch }) => {
  const { user } = state;
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user.name,
      address: user.profile?.address,
      email: user.email,
      phone: user.profile?.phone,
      gender: user.profile?.gender,
    },
    onSubmit: (values) => {
      handleSubmit.mutateAsync(values);
    },
  });

  const handleSubmit = useMutation(async (value) => {
    await API.patch('/users/profile', value, apiHeader).then((data) => {
      dispatch({
        type: 'USER_SUCCESS',
        payload: data.data.data,
      });
      toast('profile updated!');
    });
  });

  return (
    <Row className="g-0">
      <Col md={8}>
        <form onSubmit={formik.handleSubmit}>
          <FloatingLabel
            controlId="name"
            label="Name"
            className="mb-3 text-dark p-0"
          >
            <Form.Control
              type="text"
              placeholder="fullname"
              {...formik.getFieldProps('name')}
            />
          </FloatingLabel>
          <Row className="g-2">
            <Col>
              <FloatingLabel
                controlId="gender"
                label="Gender"
                className="mb-3 text-dark p-0"
              >
                <Form.Select
                  aria-label="gender"
                  {...formik.getFieldProps('gender')}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            {/* <Col md={6}>
              <FloatingLabel
                controlId="birthday-date"
                label="Date"
                className="mb-3 text-dark p-0"
              >
                <Form.Control type="date" placeholder="name@example.com" />
              </FloatingLabel>
            </Col> */}
          </Row>
          <p className="fw-bold">Contact</p>
          <FloatingLabel
            controlId="phone"
            label="No Handphone"
            className="mb-3 text-dark p-0"
          >
            <Form.Control
              type="text"
              placeholder="+62"
              {...formik.getFieldProps('phone')}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="email"
            label="Email"
            className="mb-3 text-dark p-0"
          >
            <Form.Control
              disabled
              type="email"
              placeholder="name@example.com"
              {...formik.getFieldProps('email')}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="address"
            label="Address"
            className="mb-3 text-dark p-0"
          >
            <Form.Control
              as="textarea"
              style={{ height: '100px' }}
              placeholder="address"
              {...formik.getFieldProps('address')}
            />
          </FloatingLabel>
          <div className="d-grid mb-5">
            <ButtonDumbMerch
              loading={handleSubmit.isLoading}
              type="submit"
              variant="success fw-bold"
            >
              Save
            </ButtonDumbMerch>
          </div>
        </form>
      </Col>
    </Row>
  );
};

export default FormPersonalInformation;
