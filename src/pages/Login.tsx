import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import { useLoginValue } from '../contexts/LoginProvider';
import { showToast } from '../components/Toast';

function Login() {
  const navigate = useNavigate();
  const { isLogin } = useLoginValue();
  useEffect(() => {
    function checkLogin() {
      if (isLogin) {
        showToast({ type: 'error', message: '잘못된 접근입니다' });
        navigate('/');
      }
    }
    checkLogin();
  }, [isLogin]);
  return <LoginModal />;
}

export default Login;
