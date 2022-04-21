import React, { useState } from 'react';
import { Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import toRupiah from '@develoka/angka-rupiah-js';
import dateFormat from 'dateformat';
import ButtonDumbMerch from './ButtonDumbMerch';
import { useNavigate } from 'react-router-dom';

const OrderItemCard = ({ order, admin, handleUpdateTrackingOrder }) => {
  const navigate = useNavigate();

  const orderTotal = (order_detail) => {
    let total = 0;
    order_detail.map((item) => (total += item.price * item.qty));
    return total;
  };

  const [trackingNumber, setTrackingNumber] = useState();

  const UpdateTrackingOrder = (id) => {
    handleUpdateTrackingOrder.mutate({ trackingNumber, id });
  };

  return (
    <div className="order-list mb-1">
      <Row className="g-0">
        <Col>
          <div className="order-item p-4 py-3">
            <div>
              <div className="text-end">
                <small
                  className={`order-status-pending ${
                    order?.status === 'success'
                      ? 'bg-success'
                      : order?.status === 'failed'
                      ? 'bg-danger'
                      : 'bg-warning'
                  }`}
                >
                  {order?.status}
                </small>
              </div>
              <p className="m-0 order-date">
                {order?.createdAt &&
                  dateFormat(order?.createdAt, 'mmmm dd, yyyy')}
              </p>
              <p className="order-number">{order?.invoice_number}</p>
              <div className="order-products">
                <Row className="g-0">
                  <Col
                    className="border-md-end  border-secondary border-sm-1"
                    md={8}
                  >
                    {/* product list */}

                    {order?.order_detail.map((item, i) => (
                      <Row key={i} className="g-0 mb-2">
                        <Col xs={2} md={1}>
                          <div>
                            <img
                              width={40}
                              height={25}
                              src={`https://res.cloudinary.com/dwfrpd7dh/image/upload/v1650317361/${item?.product_detail.image}`}
                              alt=""
                            />
                          </div>
                        </Col>
                        <Col className="order-item-name" xs={10} md={5}>
                          <span className="align-middle">
                            {item?.product_detail.name}
                          </span>
                        </Col>
                        <Col md={4} className="text-end order-price">
                          <span className="align-middle ">
                            {item?.qty} x{' '}
                            {item?.price &&
                              toRupiah(item?.price, {
                                floatingPoint: 0,
                              })}
                          </span>
                        </Col>
                      </Row>
                    ))}
                    {order?.tracking_number && (
                      <div className="p-2 mx-sm-3 mb-2 mb-sm-0 text-center tracking-number  rounded mt-3">
                        <p className="m-0 text-light">
                          Delivering with tracking number :{' '}
                          {order?.tracking_number}
                        </p>
                      </div>
                    )}
                  </Col>
                  {/* product total */}
                  <Col className="px-2">
                    <div className="d-flex flex-column align-items-center">
                      <div className="total-order text-center">
                        <p className="m-0">Total</p>
                        <p className="fw-bold mb-2">
                          {order?.order_detail &&
                            toRupiah(orderTotal(order?.order_detail), {
                              floatingPoint: 0,
                            })}
                        </p>
                      </div>
                      {(admin && order?.tracking_number === null) ||
                      order?.tracking_number === '' ? (
                        <div>
                          <InputGroup size="sm" className="mb-3">
                            <FormControl
                              value={trackingNumber}
                              onChange={(e) =>
                                setTrackingNumber(e.target.value)
                              }
                              placeholder="Tracking Number"
                            />
                            <ButtonDumbMerch
                              onClick={() => UpdateTrackingOrder(order?.id)}
                              id="button-addon2"
                            >
                              Deliver
                            </ButtonDumbMerch>
                          </InputGroup>
                        </div>
                      ) : (
                        ''
                      )}
                      {(!admin &&
                        !order?.isReview &&
                        order?.tracking_number !== null) ||
                      order?.tracking_number === '' ? (
                        <div>
                          <ButtonDumbMerch
                            sm
                            onClick={() =>
                              navigate('/reviews/add/' + order?.id)
                            }
                            id="button-addon2"
                          >
                            Write Review
                          </ButtonDumbMerch>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderItemCard;
