import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { user } from './types';

type loginValue = {
  isLogin: boolean;
  user: user | null;
  accessToken: string;
};
const initialValue = {
  isLogin: true,
  user: null,
  accessToken: '',
};

type loginSetting = {
  login: (email: string | undefined, password: string | undefined) => void;
  logout: () => void;
  resetToken: () => void;
};
const initialSetting: loginSetting = {
  login: (email: string | undefined, password: string | undefined) => undefined,
  logout: () => undefined,
  resetToken: () => undefined,
};

const loginValueContext = createContext<loginValue>(initialValue);
const loginSettingContext = createContext<loginSetting>(initialSetting);

export default function LoginProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [valueSet, setLoginValue] = useState<loginValue>({
    isLogin: false,
    user: null,
    accessToken: '',
  });

  const navigate = useNavigate();
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.baseURL =
    process.env.NODE_ENV === 'development' ? '' : 'https://api.7elog.store';
  axios.defaults.withCredentials = true;

  const setting = useMemo(
    () => ({
      async login(email: string | undefined, password: string | undefined) {
        try {
          const response = await axios.post('/api/v1/accounts/login/', {
            email,
            password,
          });
          setLoginValue({
            isLogin: true,
            user: response.data.user,
            accessToken: response.data.access_token,
          });
          axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
          localStorage.setItem('refreshToken', response.data.refresh_token);
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      },
      async logout() {
        try {
          await axios.post('/api/v1/accounts/logout/', {
            refresh: localStorage.getItem('refreshToken'),
          });
          setLoginValue({
            isLogin: false,
            user: null,
            accessToken: '',
          });
          localStorage.removeItem('refreshToken');
        } catch (error) {
          console.log(error);
        }
      },
      async resetToken() {
        try {
          const response = await axios.post('/api/v1/accounts/token/refresh/', {
            Refresh: localStorage.refreshToken,
          });
          setLoginValue(valueSet => {
            return {
              ...valueSet,
              accessToken: response.data.access,
            };
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),
    []
  );

  useEffect(() => {
    async function autoLogin() {
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const response = await axios.post('/api/v1/accounts/token/refresh/', {
          Refresh: refreshToken,
        });
        const response2 = await axios.get('/api/v1/accounts/user');
        setLoginValue({
          isLogin: true,
          user: response2.data,
          accessToken: response.data.access,
        });
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
      } catch (e) {
        console.log(e);
      }
    }
    autoLogin();
  }, []);

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
