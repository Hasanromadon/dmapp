import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from './pages/Admin/Category';
import Complain from './pages/user/Complain';
import ComplainAdmin from './pages/Admin/ComplainAdmin';
import AddProduct from './pages/Admin/AddProduct';
import ListProduct from './pages/Admin/ListProduct';
import DetailProduct from './pages/DetailProduct';
import NotFound from './pages/NotFound';
import Home from './pages/Home/index';
import Order from './pages/user/Order';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import WishList from './pages/user/WishList';
import UserSetting from './pages/user/UserSetting';
import Report from './pages/Admin/Report';
import AdminOrder from './pages/Admin/Order';
import Cart from './pages/user/Cart';
import PaymentSucess from './pages/user/PaymentSuccess';
import { UserContext } from './context/user/UserContext';

import { API, setAuthToken } from './config/api';
import Auth from './pages/Auth';
import Unauthorized from './pages/Unauthorized';
import EditProduct from './pages/Admin/EditProduct';

import { DBConfig } from './config/DBConfig';
import { initDB } from 'react-indexed-db';
import ReviewProducts from './pages/user/ReviewProducts';
import AddReview from './pages/user/AddReview';
import Search from './pages/Home/Search';
initDB(DBConfig);

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const checkUser = async () => {
    const response = await API.get('/users/profile');
    let payload = response.data.data;
    payload.token = localStorage.getItem('token');
    dispatch({
      type: 'USER_SUCCESS',
      payload: payload,
    });
  };

  useEffect(() => {
    if (state.isLogin) {
      checkUser();
    }
  }, [state.isLogin]);

  useEffect(() => {
    if (token && token !== '') {
      setAuthToken(token);
      checkUser();
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="auth" element={<Auth />} />
        <Route path="/products/:id" element={<DetailProduct />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-success" element={<PaymentSucess />} />
        <Route path="/profile/order" element={<Order />} />
        <Route path="/profile/wishlist" element={<WishList />} />
        <Route path="/profile/setting" element={<UserSetting />} />
        <Route path="/reviews/add/:id_order" element={<AddReview />} />
        <Route path="/reviews" element={<ReviewProducts />} />
        <Route path="/complain" element={<Complain />} />
        <Route path="/admin/report" element={<Report />} />
        <Route path="/admin/orders" element={<AdminOrder />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/product/add" element={<AddProduct />} />
        <Route path="/admin/product/edit/:id" element={<EditProduct />} />
        <Route path="/admin/product" element={<ListProduct />} />
        <Route path="/admin/complain" element={<ComplainAdmin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
