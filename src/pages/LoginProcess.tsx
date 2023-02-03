import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginValue, useLoginSetting } from '../contexts/LoginProvider';
import { showToast } from '../components/Toast';

function LoginProcess() {
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

  const { googleFinish } = useLoginSetting();

  useEffect(() => {
    googleFinish();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
      }}
    >
      <div style={{ fontSize: '3rem', color: '#12b886' }}>로그인 시도중..</div>
    </div>
  );
}

export default LoginProcess;
