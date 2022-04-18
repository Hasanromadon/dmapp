import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API, setAuthToken } from '../config/api';
import { UserContext } from '../context/user/UserContext';

const PrivateRoute = ({ user }) => {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.isLogin) {
      navigate('/auth');
      toast('please login first');
    }
  }, [state.isLogin, navigate]);
  console.log(user, state.user.role);
  return !state.islogin ? <Outlet /> : <Navigate to="/auth" />;
};
export default PrivateRoute;
