import React from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { API, apiHeader } from '../config/api';
import ButtonDumbMerch from './ButtonDumbMerch';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ModalCategory = ({ show, handleClose, modalMessage, refetch }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: modalMessage.data || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Category name is required'),
    }),

    onSubmit: (values) => {
      handleSubmit.mutateAsync(values);
    },
  });

  const handleSubmit = useMutation(async (values) => {
    try {
      if (modalMessage.title === 'Add Category') {
        await API.post('/categories', values, apiHeader);

        toast('Category added!');
      } else if (modalMessage.title === 'Edit Category') {
        await API.patch('/categories/' + modalMessage.id, values, apiHeader);
        toast('Category updated!');
      } else {
        await API.delete('/categories/' + modalMessage.id, apiHeader);
        toast('Category deleted!');
      }
      refetch();
      handleClose();
    } catch (error) {
      toast('error ' + modalMessage.title);
    }
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="form-container border-dark ">
          <Modal.Title className="text-primary-red fs-bold">
            {modalMessage.title}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body className="form-container fs-bold">
            <FloatingLabel
              controlId="category"
              label="Category Name"
              className="mb-3 text-dark p-0"
            >
              <Form.Control
                type="text"
                disabled={modalMessage.title === 'Delete Category'}
                placeholder="category"
                {...formik.getFieldProps('name')}
              />
              {formik.errors.name && formik.touched.name ? (
                <small className="text-red-primary">{formik.errors.name}</small>
              ) : null}
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer className="form-container border-dark">
            <ButtonDumbMerch type="submit">
              {modalMessage.title}
            </ButtonDumbMerch>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ModalCategory;
