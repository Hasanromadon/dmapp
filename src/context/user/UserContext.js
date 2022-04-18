import { createContext, useReducer } from 'react';
import userReducer from './userReducer';

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
