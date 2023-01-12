/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useMemo, useState } from 'react';

type modalType = { visible: boolean; title: string; message: string };
const initialModal = { visible: false, title: '', message: '' };

type actionsType = {
  open: (title: string, message: string) => void;
  close: () => void;
};
const initialActions: actionsType = {
  open: (title: string, message: string) => undefined,
  close: () => undefined,
};

const ModalValueContext = createContext<modalType>(initialModal);
const ModalActionsContext = createContext<actionsType>(initialActions);

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modal, setModal] = useState({
    visible: false,
    title: '',
    message: '',
  });

  const actions = useMemo(
    () => ({
      open(title: string, message: string) {
        setModal({
          title,
          message,
          visible: true,
        });
      },
      close() {
        setModal(prev => ({
          ...prev,
          visible: false,
        }));
      },
    }),
    []
  );

  return (
    <ModalActionsContext.Provider value={actions}>
      <ModalValueContext.Provider value={modal}>
        {children}
      </ModalValueContext.Provider>
    </ModalActionsContext.Provider>
  );
}

export function useModalValue() {
  const value = useContext(ModalValueContext);
  if (value === undefined) {
    throw new Error('useModalValue should be used within ModalProvider');
  }
  return value;
}

export function useModalActions() {
  const value = useContext(ModalActionsContext);
  if (value === undefined) {
    throw new Error('useModalActions should be used within ModalProvider');
  }
  return value;
}
