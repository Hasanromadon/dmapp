import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ButtonDumbMerch from '../../components/ButtonDumbMerch';
import Layout from '../../hoc/Layout';
import { UserContext } from '../../context/user/UserContext';
import { API, apiHeader } from '../../config/api';
import { useMutation } from 'react-query';
import { useIndexedDB } from 'react-indexed-db';
import toRupiah from '@develoka/angka-rupiah-js';
import { toast } from 'react-toastify';

const Cart = () => {
  const [state] = useContext(UserContext);
  const [cart, setCart] = useState();
  const { user } = state;
  const { getAll, clear, deleteRecord } = useIndexedDB('cart');
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteRecord(id).then((event) => {
      toast('Item deleted!');
    });
  };

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    //change this according to your client-key
    const myMidtransClientKey = 'SB-Mid-client-ZBuTiayOZocEGgLJ';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    getAll().then((cart) => {
      setCart(cart);
      let total = 0;
      cart.forEach((item) => (total += item.price * item.qty));
      setTotalPrice(total);
    });
  }, [getAll, cart]);

  const handlePay = useMutation(async () => {
    const data = {};
    const order_detail = cart.map((item) => ({
      id_product: +item.id_product,
      price: item.price,
      qty: item.qty,
    }));
    data.order_detail = order_detail;
    data.total = totalPrice;

    try {
      const response = await API.post('/transactions', data, apiHeader);

      const token = response.data;
      console.log(token);

      window.snap.pay(response.data.payment.token, {
        onSuccess: function (result) {
          alert('oke');
          navigate('/payment-success');
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate('/profile/order');
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert('you closed the popup without finishing the payment');
          navigate('/profile/order');
        },
      });
      clear();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Layout>
      <Container>
        <h3 className="text-center my-3">Your shopping cart</h3>
        {cart && cart.length > 0 ? (
          <Row className="justify-content-md-center mb-4  ">
            <Col md={10}>
              <div className="cart-container p-md-5">
                {/* reciver */}
                <div className="mb-3">
                  <p className="fw-bold">Receiver Information:</p>
                  <Row className="g-0 pb-3 receiver">
                    <Col md={12}>
                      <Row className="g-0">
                        <Col md={3} className="mb-1">
                          Name
                        </Col>
                        <Col className="mb-1 fw-bold"> {user.name}</Col>
                      </Row>
                      <Row className="g-0">
                        <Col md={3} className="mb-1">
                          No. Phone
                        </Col>
                        <Col className="mb-1 fw-bold">{user.profile.phone}</Col>
                      </Row>
                      <Row className="g-0">
                        <Col md={3} className="mb-1">
                          Address
                        </Col>
                        <Col className="mb-1 fw-bold">
                          {user.profile.address}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
                {/* product detail */}
                <div>
                  <p className="fw-bold">Product Detail:</p>
                  {/* product name */}
                  {cart && cart.length > 0 ? (
                    cart.map((item) => (
                      <Row key={item.id} className="mb-2 g-0">
                        <Col sm={1} className="action">
                          <button
                            className="btn"
                            onClick={() => handleDelete(item.id)}
                          >
                            <img src="/assets/icons/cross.svg" alt="" />
                          </button>
                        </Col>
                        <Col xs={2} sm={2}>
                          <img width={40} height={30} src={item.image} alt="" />
                        </Col>
                        <Col xs={6}>{item.name}</Col>
                        <Col className="text-end">
                          {item.qty} x{' '}
                          {toRupiah(item.price, { floatingPoint: 0 })}
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <p>You dont have item</p>
                  )}
                  <Row className="mt-2 g-0">
                    <Col md={10} className="text-end fw-bold">
                      Total
                    </Col>
                    <Col className="text-end fw-bold">
                      {toRupiah(totalPrice, {
                        floatingPoint: 0,
                      })}
                    </Col>
                  </Row>
                  <div className="text-end pt-4">
                    <ButtonDumbMerch onClick={() => handlePay.mutate()}>
                      Pay Now
                    </ButtonDumbMerch>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <div className="text-center mt-5">
            <h4>Your Cart is empty Transactions</h4>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Cart;
