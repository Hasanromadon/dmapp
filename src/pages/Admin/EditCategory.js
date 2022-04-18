import React from 'react';
import {
  Container,
  FloatingLabel,
  Form,
  Col,
  Row,
  Button,
} from 'react-bootstrap';
import LayoutAdmin from '../../hoc/LayoutAdmin';

const EditCategory = () => {
  return (
    <LayoutAdmin>
      <Container>
        <Row className="justify-content-center">
          <Col md={11}>
            <h4 className="fw-bold mb-5">Edit Category</h4>
            <Form>
              <FloatingLabel
                controlId="floatingInput"
                label="Category Name"
                className="mb-3 text-dark p-0"
              >
                <Form.Control type="text" placeholder="name@example.com" />
              </FloatingLabel>
              <div className="d-grid mt-5">
                <Button variant="success fw-bold">Save</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </LayoutAdmin>
  );
};

export default EditCategory;
