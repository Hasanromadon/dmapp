import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../../hoc/Layout';

const Profile = () => {
  const title = 'Profile';
  document.title = 'DumbMerch | ' + title;

  return (
    <Layout>
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={11}>
            <Row>
              <Col md={7}>
                <p className="text-red-primary fs-4 fw-bold">My Profile</p>
                <Row>
                  <Col>
                    <img src="assets/images/profile.png" alt="" />
                  </Col>
                  <Col>
                    <div className="mb-2">
                      <p className="profile-label text-red-primary fw-bold mb-1 ">
                        Name
                      </p>
                      <p>Hasan Romadon</p>
                    </div>
                    <div className="mb-2">
                      <p className="profile-label text-red-primary fw-bold mb-1 ">
                        Email
                      </p>
                      <p>hsanromadon@gmail.com</p>
                    </div>
                    <div className="mb-2">
                      <p className="profile-label text-red-primary fw-bold mb-1 ">
                        Phone
                      </p>
                      <p>08551188337</p>
                    </div>
                    <div className="mb-2">
                      <p className="profile-label text-red-primary fw-bold mb-1 ">
                        Gender
                      </p>
                      <p>Male</p>
                    </div>
                    <div className="mb-2">
                      <p className="profile-label text-red-primary fw-bold mb-1 ">
                        Address
                      </p>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col md={5}>
                <p className="text-red-primary fs-4 fw-bold">My Transactions</p>

                <div className="p-3 form-container d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      className="transaction-img"
                      width={110}
                      height={80}
                      src="https://assets.jalantikus.com/assets/cache/500/312/userfiles/2020/04/28/harga-laptop-asus-zenbook-duo-ux481-b7d9a.jpg.webp"
                      alt=""
                    />
                    <div className="ms-3">
                      <div>
                        <p className="text-red-primary mb-1 fs-small">Mouse</p>
                        <p className="text-red-primary mb-1 fs-xsamll ">
                          Saturday, 14 July 2022
                        </p>
                        <p className="fs-small">Price : Rp. 200.000</p>
                      </div>
                      <p className="mb-0 fs-small">Subtotal: Rp. 200.000</p>
                    </div>
                  </div>
                  <img
                    src="assets/icons/dumbmerch-logo.svg"
                    alt=""
                    width={50}
                    height={50}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Profile;
