import axios from 'axios';
import { GET_ALL_PRODUCTS } from '../types';

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/products');
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
    } catch (err) {
      console.log('error');
    }
  };
};
