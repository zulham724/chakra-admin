import axios from 'axios';

import { signOut } from 'next-auth/react';

const api = axios.create({ baseURL: process.env.CLIENT_API_URL });

// buat interceptor untuk handle error 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // jika error 401, redirect ke login
      signOut({ callbackUrl: "/pages/login" })
    }

    return Promise.reject(error);
  }
);

export default api;
