import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../hoc/Layout';
import ButtonDumbMerch from '../components/ButtonDumbMerch';
import dateFormat, { masks } from 'dateformat';
// import productsData from '../data/products';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import ReactStars from 'react-stars';
import toRupiah from '@develoka/angka-rupiah-js';
import { useIndexedDB } from 'react-indexed-db';
import { UserContext } from '../context/user/UserContext';

const DetailProduct = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const title = 'Product Detail';
  document.title = 'DumbMerch | ' + title;

  const { add, getByIndex, deleteRecord } = useIndexedDB('dumba');
  const { add: addCart } = useIndexedDB('cart');

  const params = useParams('id');
  // const product = productsData.find((product) => product.id === +params.id);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const [wishlist, setWishList] = useState();
  const [wishlistId, setWishListId] = useState();

  let { data: product, refetch } = useQuery('productCache', async () => {
    const response = await API.get('/products/' + params.id);
    return response.data.data;
  });

  let rating = product && product?.reviews?.length > 0 ? product?.reviews : [];
  rating =
    rating !== 0 && rating?.length > 0
      ? rating.map((review) => review.rating)
      : 0;
  rating =
    rating.length > 0 ? rating.reduce((p, c) => p + c) / rating.length : 0;

  const handleQty = (act) => {
    if (act === 'min') {
      if (qty > 1) {
        setQty(qty - 1);
      }
    } else {
      if (qty < product?.qty) {
        setQty(qty + 1);
      }
    }
  };

  const addToWishlist = () => {
    add({
      id_product: params.id,
      name: product?.name,
      qty: product?.qty,
      price: product?.price,
      image: product?.image,
      desc: product?.desc,
      rating: rating,
    }).then(
      (event) => {
        setWishList(true);
        setWishListId(event);
        toast('add ' + product.name + '  to cart wishlist');
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleOrder = () => {
    let detailOrder = {
      id_product: params.id,
      name: product.name,
      image: product.image,
      qty: qty,
      price: product.price,
    };
    addCart(detailOrder);
    toast('Product ' + product.name + ' added to cart');
    navigate('/cart');
  };

  const deleteWishList = () => {
    deleteRecord(wishlistId).then((event) => {
      setWishList(false);
      setWishListId();
    });
  };

  useEffect(() => {
    getByIndex('id_product', '' + params.id).then((product) => {
      if (product) {
        setWishList(true);
        setWishListId(product.id);
      }
    });
    refetch();
  }, [setWishList, setWishListId]);

  return (
    <Layout>
      <Container>
        <Row className="justify-content-md-center mb-4 mt-4  ">
          <Col md={10}>
            <Row className="g-ms-5">
              <Col md={6} className="">
                <div className="image-detail-container">
                  <img src={product?.image} alt="images" />
                </div>
              </Col>
              <Col md={6}>
                <div>
                  {state.user.role === 'admin' && (
                    <div className="text-end">
                      <button
                        onClick={() =>
                          navigate('/admin/product/edit/' + product?.id)
                        }
                        className="btn"
                      >
                        <img src="/assets/icons/edit.svg" alt="" />
                      </button>
                    </div>
                  )}

                  <h3 className="text-red-primary fs-2 fw-bold">
                    {product?.name}
                  </h3>
                  <div className="d-flex">
                    <ReactStars
                      count={5}
                      value={rating}
                      edit={false}
                      size={18}
                      color2={'#ffd700'}
                    />{' '}
                    <span className="ms-2"> ({product?.reviews?.length})</span>
                  </div>
                  <div>
                    <p>{product?.desc}</p>
                  </div>
                </div>
                <div className="border-top mt-4 pt-4">
                  {state.user.role === 'user' && (
                    <div className="text-end">
                      {wishlist ? (
                        <>
                          <button
                            className="btn btn-sm text-light"
                            onClick={() => deleteWishList(wishlistId)}
                          >
                            <img src="/assets/icons/heart-fill.svg" alt="" />{' '}
                            Remove my Wish
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-sm text-light"
                            onClick={() => addToWishlist()}
                          >
                            <img src="/assets/icons/heart-empty.svg" alt="" />{' '}
                            Add to my Wish
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  <p>Stock: {product?.qty}</p>
                  <div className=" d-flex justify-content-between align-items-center">
                    <div className="button-add mb-4">
                      <Button
                        variant="none"
                        className="border text-white"
                        onClick={() => handleQty('min')}
                      >
                        -
                      </Button>
                      <span className="mx-4">{qty}</span>
                      <Button
                        variant="none"
                        className="border text-white"
                        onClick={() => handleQty(1)}
                      >
                        +
                      </Button>
                    </div>
                    <p>
                      {product?.price &&
                        toRupiah(product.price, { floatingPoint: 0 })}
                    </p>
                  </div>
                  <div>
                    {state.user.role === 'user' && (
                      <ButtonDumbMerch
                        disabled={product?.qty < 1 ? true : false}
                        onClick={handleOrder}
                        full
                      >
                        {product?.qty < 1 ? 'Out of stock' : 'Buy'}
                      </ButtonDumbMerch>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md={10}>
            <div className="border-top">
              <h3 className="my-4">Review</h3>
              {product?.reviews && product.reviews.length > 0 ? (
                <>
                  {product?.reviews.map((review) => (
                    <div key={review.id} className="rating mb-4">
                      <div>
                        <ReactStars
                          count={5}
                          value={review.rating}
                          edit={false}
                          size={18}
                          color2={'#ffd700'}
                        />
                        <p className="my-3">{review.review}</p>
                        <p className="text-muted">
                          {review.user.name} on{' '}
                          {dateFormat(review.createdAt, 'mmmm dd, yyyy')}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p>No review</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default DetailProduct;
