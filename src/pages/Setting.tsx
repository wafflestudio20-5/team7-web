import React, { useState } from 'react';
import Header from '../components/Header';
import SettingSetter from '../components/SettingSetter';
import QuitModal from '../components/QuitModal';

function Setting() {
  const [quitModal, setQuitModal] = useState(false);

  function openQuitModal() {
    setQuitModal(true);
  }

  function closeQuitModal() {
    setQuitModal(false);
  }

  return (
    <div
      style={{
        backgroundColor: '#F8F9FA',
      }}
    >
      <Header />
      <SettingSetter
        openQuitModal={() => {
          openQuitModal();
        }}
      />
      <QuitModal
        quitModal={quitModal}
        closeQuitModal={() => {
          closeQuitModal();
        }}
      />
    </div>
  );
}

export default Setting;
