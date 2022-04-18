import React, { useState } from 'react';
import { Container, Table, Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import ButtonDumbMerch from '../../components/ButtonDumbMerch';
import LayoutAdmin from '../../hoc/LayoutAdmin';
import { API, apiHeader } from '../../config/api';
import { useMutation, useQuery } from 'react-query';
import ShowMoreText from 'react-show-more-text';
import toRupiah from '@develoka/angka-rupiah-js';
import ModalImage from '../../components/ModalImage';
import GenaralModal from '../../components/GenaralModal';
import { toast } from 'react-toastify';
const ListProduct = () => {
  let { data: products, refetch } = useQuery('productCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });

  const [productId, setProductId] = useState();

  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleClose = () => setShow(false);

  const handleCloseImage = () => setShowImage(false);
  const handleShowImage = () => setShowImage(true);

  const handleClickShowImage = (url) => {
    setImageUrl(url);
    handleShowImage();
  };

  const handleShow = (id) => {
    setShow(true);
    setProductId(id);
  };

  const handleDelete = useMutation(async (values) => {
    try {
      await API.delete('/products/' + productId, apiHeader);
      toast('Product deleted!');
      refetch();
      handleClose();
    } catch (error) {
      toast('error delete');
    }
  });

  const navigate = useNavigate();

  const navigateAdd = () => {
    navigate('/admin/product/add');
  };

  return (
    <LayoutAdmin>
      <Col>
        <Row className="justify-content-center">
          <Col md={12}>
            <h4 className="fw-bold">List Products</h4>
            <div className="text-end mb-3">
              <ButtonDumbMerch
                onClick={() => navigateAdd()}
                className="me-auto"
              >
                Add Product
              </ButtonDumbMerch>
            </div>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th className="col-1 text-center">No</th>
                  <th className="col-1">Photo</th>
                  <th className="col-3">Product Name</th>
                  <th>Product Desc</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th className="col-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0
                  ? products.map((product, i) => (
                      <tr key={product?.id}>
                        <td className="text-center">{i + 1}</td>
                        <td>
                          <button
                            className="btn bg-transparent"
                            onClick={() => handleClickShowImage(product?.image)}
                          >
                            <img src="/assets/icons/file.svg" alt="" />
                          </button>
                        </td>
                        <td>{product?.name} </td>
                        <td>
                          {' '}
                          <ShowMoreText
                            lines={2}
                            more="Show more"
                            less="Show less"
                            anchorClass="text-red-primary"
                            expanded={false}
                            width={280}
                            truncatedEndingComponent={'... '}
                          >
                            {product?.desc}
                          </ShowMoreText>{' '}
                        </td>
                        <td>
                          {' '}
                          {product?.price &&
                            toRupiah(product.price, { floatingPoint: 0 })}
                        </td>
                        <td>{product?.qty}</td>
                        <td>
                          <Button
                            as={Link}
                            to={'/admin/product/edit/' + product?.id}
                            size="sm"
                            variant="success"
                            className="me-1"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleShow(product?.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
      <GenaralModal
        show={show}
        modalData={{
          title: 'Delete',
          message: `Are you Sure want delete this product?`,
        }}
        handleDelete={handleDelete}
        handleClose={handleClose}
      />
      <ModalImage
        show={showImage}
        handleClose={handleCloseImage}
        imageUrl={imageUrl}
      />
    </LayoutAdmin>
  );
};

export default ListProduct;
