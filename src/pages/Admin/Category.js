import React, { useState } from 'react';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ButtonDumbMerch from '../../components/ButtonDumbMerch';
import ModalCategory from '../../components/ModalCategory';
import { API } from '../../config/api';
import LayoutAdmin from '../../hoc/LayoutAdmin';

const Category = () => {
  const title = 'Category';
  document.title = 'DumbMerch | ' + title;

  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: '',
    data: '',
    id: '',
  });

  let { data: categories, refetch } = useQuery('categoriesCache', async () => {
    const response = await API.get('/categories');
    return response.data.data;
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalShow = (action, data, id) => {
    setShow(true);
    if (action === 'add') {
      setModalMessage({
        title: 'Add Category',
      });
    } else if (action === 'edit') {
      setModalMessage({
        title: 'Edit Category',
        data,
        id,
      });
    } else {
      setModalMessage({
        title: 'Delete Category',
        data,
        id,
      });
    }
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/admin/category/edit');
  };

  return (
    <>
      <LayoutAdmin>
        <Col>
          <Row className="justify-content-center">
            <Col md={12}>
              <h4 className="fw-bold">List Categories</h4>
              <div className="text-end mb-3">
                <ButtonDumbMerch
                  onClick={() => modalShow('add')}
                  className="me-auto"
                >
                  Add Category
                </ButtonDumbMerch>
              </div>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th className="col-1 text-center">No</th>
                    <th className="col-6">Category Name</th>
                    <th className="col-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.length > 0
                    ? categories.map((category, index) => (
                        <>
                          <tr key={category.id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>
                              <Button
                                variant="success"
                                size="sm"
                                className="me-1"
                                onClick={() =>
                                  modalShow('edit', category.name, category.id)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() =>
                                  modalShow(
                                    'delete',
                                    category.name,
                                    category.id
                                  )
                                }
                                size="sm"
                                variant="danger"
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        </>
                      ))
                    : null}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
        <ModalCategory
          modalMessage={modalMessage}
          refetch={refetch}
          show={show}
          handleClose={handleClose}
        />
      </LayoutAdmin>
    </>
  );
};

export default Category;
