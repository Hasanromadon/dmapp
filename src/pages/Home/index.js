import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import Layout from '../../hoc/Layout';
import productsData from '../../data/products';
import { UserContext } from '../../context/user/UserContext';

import { useQuery } from 'react-query';
import { API } from '../../config/api';
const Home = () => {
  const title = 'Home';
  document.title = 'DumbMerch | ' + title;

  let { data: products, refetch } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });

  return (
    <Layout>
      <Container className="mt-5">
        <h3>Products</h3>
        <Row className="g-3">
          {products &&
            products.length !== 0 &&
            products.map((product) => (
              <Col col={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
        </Row>
        <div className="divider my-5"></div>
        <section className="mb-5">
          <Link to="/">
            <img
              className="img-fluid"
              src="/assets/images/big-deal-promo.png"
              alt="big deal promotion"
            />
          </Link>
        </section>
        <h3 className="mb-5">Product Promo </h3>
        <Row className="gx-3 gy-5">
          <Col md={3}>
            <img
              className="special-promo d-block img-fluid"
              src="/assets/images/ramadhan-sale.png"
              alt=""
            />
          </Col>
          {products &&
            products.length !== 0 &&
            products.map((product) => (
              <Col col={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
