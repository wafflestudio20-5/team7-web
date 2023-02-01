import React, { useEffect } from 'react';
import axios from 'axios';
import { useLoginSetting } from '../contexts/LoginProvider';

function LoginProcess() {
  const { googleFinish } = useLoginSetting();

  useEffect(() => {
    googleFinish();
  }, []);

  return <div>Login Process</div>;
}

export default LoginProcess;
