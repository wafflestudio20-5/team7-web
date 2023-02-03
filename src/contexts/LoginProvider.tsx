import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { user } from './types';
import { showToast } from '../components/Toast';

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
  googleFinish: () => void;
  changeUserValue: (newUser: user) => void;
};
const initialSetting: loginSetting = {
  login: (email: string | undefined, password: string | undefined) => undefined,
  logout: () => undefined,
  resetToken: () => undefined,
  googleFinish: () => undefined,
  changeUserValue: (newUser: user) => undefined,
};

const loginValueContext = createContext<loginValue>(initialValue);
const loginSettingContext = createContext<loginSetting>(initialSetting);

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? '' : 'https://api.7elog.store';
axios.defaults.withCredentials = true;
const cookies = new Cookies();

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

  const setting = useMemo(
    () => ({
      async login(email: string | undefined, password: string | undefined) {
        try {
          const response = await axios.post(
            '/api/v1/accounts/login/',
            {
              email,
              password,
            },
            {
              headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
              },
            }
          );
          setLoginValue({
            isLogin: true,
            user: response.data.user,
            accessToken: response.data.access_token,
          });
          axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
          localStorage.setItem('refreshToken', response.data.refresh_token);
          navigate('/');
        } catch (error: Error | any) {
          const keys = Object.keys(error.response.data);
          const key = keys[0];
          const message = error.response.data[key][0];
          showToast({ type: 'error', message: `${key}: `.concat(message) });
        }
      },
      async logout() {
        try {
          await axios.post(
            '/api/v1/accounts/logout/',
            {
              refresh: localStorage.getItem('refreshToken'),
            },
            {
              headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
              },
            }
          );
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
            refresh: localStorage.refreshToken,
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
      async googleFinish() {
        const accessToken = new URL(
          window.location.href.replace('#', '?')
        ).searchParams.get('access_token');
        try {
          const response = await axios.post(
            `/api/v1/accounts/google/login/finish/`,
            {
              access_token: accessToken,
            }
          );
          axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
          setLoginValue({
            isLogin: true,
            user: response.data.user,
            accessToken: response.data.access_token,
          });
          localStorage.setItem('refreshToken', response.data.refresh_token);
          navigate('/');
        } catch (e) {
          console.log(e);
        }
      },
      changeUserValue(newUser: user) {
        setLoginValue(valueSet => {
          return {
            ...valueSet,
            user: newUser,
          };
        });
      },
    }),
    []
  );

  const autoLogin = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.post(
        '/api/v1/accounts/token/refresh/',
        {
          refresh: refreshToken,
        },
        {
          headers: {
            'X-CSRFToken': cookies.get('csrftoken'),
          },
        }
      );
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
      const response2 = await axios.get('/api/v1/accounts/user');
      setLoginValue({
        isLogin: true,
        user: response2.data,
        accessToken: response.data.access,
      });
    } catch (e) {
      console.log(e);
    }
  }, [setLoginValue]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

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
