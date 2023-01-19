import React, { useState } from 'react';
import Header from '../components/Header';
import SettingSetter from '../components/SettingSetter';

function Setting() {
  return (
    <div
      style={{
        backgroundColor: '#F8F9FA',
      }}
    >
      <Header />
      <SettingSetter />
    </div>
  );
}

export default Setting;
