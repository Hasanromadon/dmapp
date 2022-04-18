import React from 'react';
import toRupiah from '@develoka/angka-rupiah-js';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
// import Rating from 'react-rating';

const ProductCard = ({ product, wishlist }) => {
  let rating = 0;
  if (!wishlist) {
    rating = product?.reviews.length > 0 ? product.reviews : 0;

    rating = rating.length > 0 ? rating.map((review) => review.rating) : 0;
    rating =
      rating.length > 0 ? rating.reduce((p, c) => p + c) / rating.length : 0;
  } else {
    rating = product?.rating;
  }
  return (
    <div className="card-product rounded shadow">
      <div className="card-image">
        <img src={product.image} alt="" />
      </div>
      <div className="card-body">
        <Link
          to={`/products/${wishlist ? product?.id_product : product?.id}`}
          className="card-product-name text-red-primary"
        >
          {product.name}
        </Link>
        <div className="card-price-container">
          <span className="card-product-price">
            {product?.price && toRupiah(product.price, { floatingPoint: 0 })}
          </span>{' '}
          <span className="mx-2">| </span>stock : {product.qty}
        </div>
        <ReactStars
          count={5}
          value={rating}
          edit={false}
          size={18}
          color2={'#ffd700'}
        />
        {product.desc?.substring(0, 40)}
      </div>
    </div>
  );
};

export default ProductCard;
