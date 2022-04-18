import React from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { API, apiHeader } from '../config/api';
import ButtonDumbMerch from './ButtonDumbMerch';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const GenaralModal = ({ show, handleClose, modalData, handleDelete }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="form-container border-dark ">
          <Modal.Title className="text-primary-red fs-bold">
            {modalData?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="form-container fs-bold">
          {modalData?.message}
        </Modal.Body>
        <Modal.Footer className="form-container border-dark">
          <ButtonDumbMerch onClick={() => handleDelete.mutate()}>
            {modalData?.title}
          </ButtonDumbMerch>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GenaralModal;
