import React, { createContext, useContext, useMemo, useState } from 'react';
import { user } from './types';

type loginValue = {
  isLogin: boolean;
  user: user | null;
  access_token: string;
};
const initialValue = { isLogin: true, user: null, access_token: '' };

type loginSetting = {
  login: (newUser: user, token: string) => void;
  logout: () => void;
  resetToken: (token: string) => void;
};
const initialSetting: loginSetting = {
  login: (newUser: user, token: string) => undefined,
  logout: () => undefined,
  resetToken: (token: string) => undefined,
};

const loginValueContext = createContext<loginValue>(initialValue);
const loginSettingContext = createContext<loginSetting>(initialSetting);

export default function LoginProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [valueSet, setLoginValue] = useState<loginValue>({
    isLogin: true,
    user: null,
    access_token: '',
  });

  const setting = useMemo(
    () => ({
      login(newUser: user, accessToken: string) {
        setLoginValue({
          isLogin: true,
          user: newUser,
          access_token: accessToken,
        });
      },
      logout() {
        setLoginValue({
          isLogin: false,
          user: null,
          access_token: '',
        });
      },
      resetToken(accessToken: string) {
        setLoginValue({
          isLogin: valueSet.isLogin,
          user: valueSet.user,
          access_token: accessToken,
        });
      },
    }),
    []
  );

  return (
    <loginValueContext.Provider value={valueSet}>
      <loginSettingContext.Provider value={setting}>
        {children}
      </loginSettingContext.Provider>
    </loginValueContext.Provider>
  );
}

export function useLoginValue() {
  const value = useContext(loginValueContext);
  if (value === undefined) {
    throw new Error('context error');
  }
  return value;
}

export function useLoginSetting() {
  const value = useContext(loginSettingContext);
  if (value === undefined) {
    throw new Error('context error');
  }
  return value;
}
