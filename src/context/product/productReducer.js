import { GET_PRODUCTS } from '../types';

const productReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        isLogin: true,
        products: payload.products,
      };

    default:
      throw new Error();
  }
};

export default productReducer;
