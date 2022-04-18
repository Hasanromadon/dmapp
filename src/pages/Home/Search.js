import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import Layout from '../../hoc/Layout';

import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/api';
import ButtonDumbMerch from '../../components/ButtonDumbMerch';
import qs from 'qs';
import Loading from '../../components/Loading';

const Search = () => {
  const [search] = useSearchParams();
  const [categoryChecked, setCategoryChecked] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [productResultData, setProductResultData] = useState([]);
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const title = 'Search';
  document.title = 'DumbMerch | ' + title;
  // first fetch
  let { data: products } = useQuery('productsCache', async () => {
    setLoading(true);
    const response = await API.get('/products', {
      params: {
        name: search.get('key'),
      },
    });
    setProductResultData(response.data.data);
    setLoading(false);
    return response.data.data;
  });

  let { data: categories } = useQuery('categoriesCache', async () => {
    const response = await API.get('/categories');
    return response.data.data;
  });

  const handleSearchSubmit = useMutation(async (key) => {
    setLoading(true);
    const response = await API.get('/products', {
      params: {
        name: key,
      },
    });
    setLoading(false);
    setProductResultData(response.data.data);
    return response.data.data;
  });

  const handleSubmitFilter = useMutation(async (e) => {
    setLoading(true);
    const response = await API.get('/products', {
      params: {
        name: search.get('key'),
        category: categoryChecked,
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 1000000000,
      },
      paramsSerializer: (p) => {
        return qs.stringify(p, { arrayFormat: 'brackets' });
      },
    });
    setLoading(false);
    setProductResultData(response.data.data);
    return response.data.data;
  });

  const handleToggle = (value) => {
    const currentIndex = categoryChecked.indexOf(value);
    const newChecked = [...categoryChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCategoryChecked(newChecked);
  };

  const handleReset = useMutation(async () => {
    setLoading(true);
    const response = await API.get('/products');
    setLoading(false);
    setProductResultData(response.data.data);
    return response.data.data;
  });

  useEffect(() => {
    handleSubmitFilter.mutate();
  }, []);

  return (
    <Layout handleSearchSubmit={handleSearchSubmit}>
      <Container fluid className="mt-5 px-4">
        <p>Advance Search</p>
        <Row className="g-2">
          <Col md={3} className="border-end border-secondary me-4">
            <div className="mb-4">
              <p className="fw-bold">Category</p>

              {categories &&
                categories.map((cat) => (
                  <>
                    <Form.Check
                      onChange={() => handleToggle(cat?.id)}
                      checked={categoryChecked.indexOf(cat?.id) !== -1}
                      label={cat?.name}
                    />
                  </>
                ))}
            </div>
            <Row className="g-0">
              <Col md={11}>
                <p className="fw-bold">Price</p>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="minprice">Rp</InputGroup.Text>
                  <FormControl
                    onChange={(e) => setMinPrice(e.target.value)}
                    type="number"
                    placeholder="Min Price"
                  />
                </InputGroup>
                <InputGroup className="mb-3 ">
                  <InputGroup.Text id="maxprice">Rp</InputGroup.Text>
                  <FormControl
                    onChange={(e) => setMaxPrice(e.target.value)}
                    type="number"
                    placeholder="Max Price"
                  />
                </InputGroup>

                <div className="text-end">
                  <Link
                    to="/search"
                    className="me-2 reset-button"
                    onClick={(e) => handleReset.mutate()}
                  >
                    Reset
                  </Link>
                  <ButtonDumbMerch
                    onClick={(e) => handleSubmitFilter.mutate(e)}
                  >
                    Filter
                  </ButtonDumbMerch>
                </div>
              </Col>
            </Row>
          </Col>
          {/* search */}
          <Col>
            {loading && <Loading />}
            <Row className="g-2">
              {productResultData && productResultData.length !== 0 ? (
                productResultData.map((product) => (
                  <Col md={4} key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))
              ) : (
                <p>No Product Found!</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Search;
