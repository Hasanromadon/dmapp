import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
const Footer = () => {
  return (
    <footer className="text-center footer py-4">
      <Container>
        <Row className="g-0">
          <Col>
            <img
              className="mb-2"
              width={34}
              src="/assets/icons/dumbmerch-logo.svg"
              alt="dumbways logo"
            />
            <p className="m-0 footer-text">
              Dumbmerch is App for buy merchandise, just go to dumb merch
              shopping. the biggest merchandise in Indonesia
            </p>
            <p className="footer-text">
              {' '}
              <span className="text-red-primary">Dumbmerch</span> - Copyright
              2022
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
