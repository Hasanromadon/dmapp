import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useIndexedDB } from 'react-indexed-db';
import ProductCard from '../../components/ProductCard';
import LayoutUser from '../../hoc/LayoutUser';
const WishList = () => {
  const title = 'Wishlist';
  document.title = 'DumbMerch | ' + title;

  const { getAll } = useIndexedDB('dumba');
  const [products, setProducts] = useState();

  useEffect(() => {
    getAll().then((produtsDb) => {
      setProducts(produtsDb);
    });
  }, []);

  return (
    <LayoutUser wishlist={products && products.length && products.length}>
      <Col className="p-0">
        <h5 className="mb-3">My Dumba (Wishlist)</h5>
        <Row className="g-2">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Col key={product.id} md={4}>
                <ProductCard wishlist product={product} />
              </Col>
            ))
          ) : (
            <h5>You dont have any favorite</h5>
          )}
        </Row>
      </Col>
    </LayoutUser>
  );
};

export default WishList;
