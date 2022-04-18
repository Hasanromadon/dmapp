import { GET_ALL_PRODUCTS } from '../types';

export const productListReducer = (state = { allProducts: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { allProducts: action.payload.data };
    default:
      return state;
  }
};
