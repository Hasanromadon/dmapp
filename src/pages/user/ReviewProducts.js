import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import ButtonDumbMerch from '../../components/ButtonDumbMerch';
import { API } from '../../config/api';
import toRupiah from '@develoka/angka-rupiah-js';
import dateFormat, { masks } from 'dateformat';
import LayoutUser from '../../hoc/LayoutUser';
import ReactStars from 'react-stars';

const ReviewProducts = () => {
  let { data: reviews, refetch } = useQuery('reviewsCache', async () => {
    const response = await API.get('/reviews');
    return response.data.data;
  });

  return (
    <LayoutUser>
      <Col className="">
        <h5 className="mb-3">My Review</h5>

        <div>
          <Table hover variant="dark">
            <thead>
              <tr>
                <th>Products</th>
                <th>Rating</th>
                <th className="text-center">Review</th>
              </tr>
            </thead>
            <tbody>
              {reviews &&
                reviews?.length > 0 &&
                reviews.map((item) => (
                  <>
                    <tr>
                      <td>
                        <small className="text-light d-block ">
                          {' '}
                          {dateFormat(item?.createdAt, 'mmmm, dd, yyyy')}
                        </small>
                        <img
                          className="me-2 mt-2"
                          width={40}
                          height={30}
                          src={item?.product_detail.image}
                          alt=""
                        />{' '}
                        <p className="d-inline d-sm-block ">
                          {item?.product_detail?.name}
                        </p>
                      </td>
                      <td>
                        <ReactStars
                          count={5}
                          edit={false}
                          value={item?.rating}
                        />
                      </td>
                      <td>"{item?.review}"</td>
                    </tr>
                  </>
                ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </LayoutUser>
  );
};

export default ReviewProducts;
