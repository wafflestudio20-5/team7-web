import React from 'react';
import { Flip, toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.scss';

interface ToastProps {
  type: 'success' | 'error' | 'info' | 'action';
  message?: string;
}

const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  icon: false,
  transition: Flip,
};

export function showToast({ type, message }: ToastProps) {
  switch (type) {
    case 'success':
      toast.success(message || '성공적으로 완료되었습니다', {
        ...toastOptions,
      });
      break;
    case 'error':
      toast.error(message || '다시 한번 시도해주세요', {
        ...toastOptions,
      });
      break;
    default:
      break;
  }
}

export default function Toast() {
  return <ToastContainer />;
}
