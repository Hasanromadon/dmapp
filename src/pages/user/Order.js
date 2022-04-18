import React, { useEffect, useReducer, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import ButtonDumbMerch from '../../components/ButtonDumbMerch';
import { API } from '../../config/api';
import toRupiah from '@develoka/angka-rupiah-js';
import dateFormat, { masks } from 'dateformat';
import LayoutUser from '../../hoc/LayoutUser';
import OrderItemCard from '../../components/OrderItemCard';

const Order = () => {
  const title = 'Orders';
  document.title = 'DumbMerch | ' + title;

  const [orderData, setOrderData] = useState();
  const [activeFilter, setActiveFilter] = useState();

  let { data: orders, refetch } = useQuery('ordersCache', async () => {
    const response = await API.get('/transactions');

    return response.data.data;
  });

  const filteredOrder = (status) => {
    console.log(status);
    let data;
    if (status === 'all') {
      setOrderData(orders);
      setActiveFilter(status);
    } else if (status === 'new') {
      data = orders.filter((order) => order.tracking_number === null);
      setOrderData(data);
      setActiveFilter(status);
    } else if (status === 'complete') {
      data = orders.filter((order) => order.tracking_number !== null);
      setOrderData(data);
      setActiveFilter(status);
    } else {
      return orders;
    }
  };

  useEffect(() => {
    if (orders && orders.length > 0) {
      setOrderData(orders);
      filteredOrder('new');
      setActiveFilter('new');
    }
  }, [orders]);

  return (
    <LayoutUser>
      <Col className="">
        <h5 className="mb-3">My Orders List</h5>
        <div className="mb-3">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              onClick={() => filteredOrder('new')}
              type="button"
              className={
                activeFilter === 'new'
                  ? 'btn btn-danger'
                  : 'btn btn-outline-danger'
              }
            >
              New
            </button>
            <button
              type="button"
              onClick={() => filteredOrder('complete')}
              className={
                activeFilter === 'complete'
                  ? 'btn btn-danger'
                  : 'btn btn-outline-danger'
              }
            >
              Complete
            </button>
            <button
              type="button"
              onClick={() => filteredOrder('all')}
              className={
                activeFilter === 'all'
                  ? 'btn btn-danger'
                  : 'btn btn-outline-danger'
              }
            >
              All
            </button>
          </div>
        </div>
        {/* order list */}
        {orderData && orderData.length > 0 ? (
          orderData.map((order) => (
            <OrderItemCard order={order} key={order.id} />
          ))
        ) : (
          <p>You Don't have any transactions</p>
        )}
      </Col>
    </LayoutUser>
  );
};

export default Order;
