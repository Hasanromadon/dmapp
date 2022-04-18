import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import paymentSuccess from '../../components/lottieData/payment_success.json';
import Layout from '../../hoc/Layout';
import Lottie from 'react-lottie';
import ButtonDumbMerch from '../../components/ButtonDumbMerch';
const PaymentSucess = () => {
  const title = 'Payment Success';
  document.title = 'DumbMerch | ' + title;

  const options = {
    animationData: paymentSuccess,
    loop: false,
    autoplay: true,
  };
  return (
    <Layout>
      <Container>
        <Row className="justify-content-md-center pt-5">
          <Col md={10} className="text-center pt-5">
            <Lottie width={150} height={150} options={options} />
            <div>
              <h3 className="mb-4">Transaction Success!</h3>
              <ButtonDumbMerch>Back to Home</ButtonDumbMerch>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default PaymentSucess;
