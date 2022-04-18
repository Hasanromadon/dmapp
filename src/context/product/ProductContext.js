import { createContext, useReducer } from 'react';
import userReducer from './userReducer';

export const ProductContext = createContext();

const initialState = {
  products: [],
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <ProductContext.Provider value={[state, dispatch]}>
      {children}
    </ProductContext.Provider>
  );
};
