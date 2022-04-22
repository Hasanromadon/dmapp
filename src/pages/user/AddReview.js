import React from 'react';
import { Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import LayoutUser from '../../hoc/LayoutUser';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/ReviewForm';

const AddReview = () => {
  const params = useParams();
  let { data: order } = useQuery('orderCache', async () => {
    const response = await API.get('/transactions/reviews/' + params.id_order);

    return response.data.data;
  });

  return (
    <LayoutUser>
      <Col className="">
        <h5 className="mb-3">Add Review</h5>
        {/* order list */}
        {order && <ReviewForm order={order[0]} />}
      </Col>
    </LayoutUser>
  );
};

export default AddReview;
