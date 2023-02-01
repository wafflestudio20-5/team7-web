import React, { useEffect } from 'react';
import axios from 'axios';
import { useLoginSetting } from '../contexts/LoginProvider';

function LoginProcess() {
  const { googleFinish } = useLoginSetting();
  // const getgitHubToken = async () => {
  //   const authCode = new URL(window.location.href).searchParams.get('code');
  //   try {
  //     const response = await axios.post(
  //       'https://github.com/login/oauth/access_token',
  //       {
  //         client_id: 'c6d4c32547dbe4263ea7',
  //         client_secret: '2593ebc3ed0c27a7ebca65f514de468653e0f145',
  //         code: authCode,
  //         redirect_uri: 'http://localhost:3000/loginProcess',
  //       },
  //       {
  //         headers: {
  //           Accept: 'application/json',
  //         },
  //         withCredentials: false,
  //       }
  //     );
  //     console.log(response);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    googleFinish();
  }, []);

  return <div>Login Process</div>;
}

export default LoginProcess;
