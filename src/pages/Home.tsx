import React from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import HomeContents from '../components/HomeContents';

function Home() {
  return (
    <div
      style={{
        backgroundColor: '#F8F9FA',
      }}
    >
      <Header />
      <HomeContents />
    </div>
  );
}

export default Home;
