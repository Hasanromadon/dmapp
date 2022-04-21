import React, { useEffect, useState } from 'react';
import { Row, Col, FormControl, FloatingLabel, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import dateFormat from 'dateformat';
import ReactStars from 'react-stars';
import { Rating } from 'react-simple-star-rating';
import ButtonDumbMerch from './ButtonDumbMerch';
import { useMutation } from 'react-query';
import { API, apiHeader } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ReviewForm = ({ order }) => {
  const [rating, setRating] = useState(5);
  const [productId, setProductId] = useState([]);
  const navigate = useNavigate();
  const getProductId = () => {
    let product = [];
    product = order?.order_detail.map((item) =>
      product.push(item.product_detail.id)
    );
    setProductId(product);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id_transaction: order?.id,
      rating: rating,
      review: '',
      id_product: productId,
    },
    onSubmit: (values) => {
      handleSumbit.mutate(values);
    },
  });

  const handleSumbit = useMutation(async (values) => {
    try {
      await API.post('/reviews', values, apiHeader);
      toast('Review added!');
      navigate('/reviews');
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (order) {
      getProductId();
      console.log(productId);
    }
  }, []);

  return (
    <div className="review-form p-4">
      <div>
        <Row className="g-0">
          <Col md={3}>Transaction Date</Col>
          <Col md={9}>
            :{' '}
            {order?.createdAt && dateFormat(order?.createdAt, 'mmmm dd, yyyy')}
          </Col>
          <Col md={3}>Invoice</Col>
          <Col md={9}>: {order?.invoice_number && order?.invoice_number}</Col>
        </Row>
        <div className="mt-5">
          <p>Rate product:</p>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mb-5">
              {order?.order_detail &&
                order.order_detail.map((item) => (
                  <>
                    <Row className="mb-2">
                      <Col md={1}>
                        <img
                          height={40}
                          width={60}
                          src={
                            'https://res.cloudinary.com/dwfrpd7dh/image/upload/v1650317361/' +
                            item?.product_detail.image
                          }
                          alt=""
                        />
                      </Col>
                      <Col className="ps-4" md={10}>
                        <p className="m-0 fw-bold mt-1">
                          {item?.product_detail.name}
                        </p>
                      </Col>
                    </Row>
                  </>
                ))}
            </Row>
            <div className="mb-3">
              <Rating
                initialValue={rating}
                size={24}
                onClick={(v) => setRating(v / 20)}
                showTooltip
                tooltipArray={[
                  'Terrible',
                  'Bad',
                  'Average',
                  'Great',
                  'Prefect',
                ]}
              />
            </div>
            <FloatingLabel
              controlId="Review"
              label="Write your experince"
              className="mb-3 text-dark p-0"
            >
              <Form.Control
                as="textarea"
                style={{ height: '100px', resize: 'none' }}
                placeholder="description"
                {...formik.getFieldProps('review')}
              />
            </FloatingLabel>
            <div className="text-end">
              <ButtonDumbMerch loading={handleSumbit.isLoading} type="submit">
                Submit
              </ButtonDumbMerch>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
