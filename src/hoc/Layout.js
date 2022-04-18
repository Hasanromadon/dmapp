import React, { useContext } from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import NavbarLayout from '../components/NavbarLayout';
import { UserContext } from '../context/user/UserContext';

const Layout = ({ children, playAnimateCart, handleSearchSubmit }) => {
  const [state, dispatch] = useContext(UserContext);

  return (
    <>
      {state.user && state.user.role === 'admin' ? (
        <NavbarAdmin />
      ) : (
        <NavbarLayout
          handleSearchSubmit={handleSearchSubmit}
          playAnimateCart={playAnimateCart}
        />
      )}
      {children}
    </>
  );
};

export default Layout;
