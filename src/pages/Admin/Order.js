import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';

import LayoutAdmin from '../../hoc/LayoutAdmin';
import OrderItemCard from '../../components/OrderItemCard';
import { API, apiHeader } from '../../config/api';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

const OrderAdmin = () => {
  const [orderData, setOrderData] = useState();
  const [activeFilter, setActiveFilter] = useState();
  let { data: orders, refetch } = useQuery('ordersCache', async () => {
    const response = await API.get('/transactions');
    return response.data.data;
  });

  const handleUpdateTrackingOrder = useMutation(async (data) => {
    try {
      const payload = {
        tracking_number: data.trackingNumber,
      };
      console.log('payload nihh', payload);
      await API.patch('/transactions/' + data.id, payload, apiHeader);
      toast('order updated!');
      refetch();
    } catch (error) {
      console.log(error);
    }
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
    <LayoutAdmin>
      <Col className="">
        <h5 className="mb-3">My Orders List</h5>
        <div className="mb-3">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={
                activeFilter === 'new'
                  ? 'btn btn-danger'
                  : 'btn btn-outline-danger'
              }
              onClick={() => filteredOrder('new')}
            >
              New Order
            </button>
            <button
              type="button"
              className={
                activeFilter === 'complete'
                  ? 'btn btn-danger'
                  : 'btn btn-outline-danger'
              }
              onClick={() => filteredOrder('complete')}
            >
              Complete
            </button>
            <button
              type="button"
              className={
                activeFilter === 'all'
                  ? 'btn btn-danger'
                  : 'btn btn-outline-danger'
              }
              onClick={() => filteredOrder('all')}
            >
              All
            </button>
          </div>
        </div>
        {orderData && orderData.length > 0 ? (
          orderData.map((order) => (
            <OrderItemCard
              handleUpdateTrackingOrder={handleUpdateTrackingOrder}
              admin
              order={order}
              key={order.id}
            />
          ))
        ) : (
          <p>You Don't have any transactions</p>
        )}
      </Col>
    </LayoutAdmin>
  );
};

export default OrderAdmin;
