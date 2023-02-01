import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import HeaderFilter from '../components/HeaderFilter';
import HeaderMoving from '../components/HeaderMoving';

export default function HeaderLayout() {
  return (
    <div
      style={{
        backgroundColor: '#F8F9FA',
      }}
    >
      <Header />
      <div style={{ marginTop: '2rem' }} />
      <HeaderFilter />
      <HeaderMoving />
      <Outlet />
    </div>
  );
}
