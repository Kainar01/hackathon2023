import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { LoginPage } = lazyImport(() => import('./Login'), 'LoginPage');
const { AdminLoginPage } = lazyImport(() => import('./Login'), 'AdminLoginPage');

export const AuthRoutes = [
  <Route path="/login" element={<LoginPage />} key="login" />,
  <Route path="/admin-login" element={<AdminLoginPage />} key="login-admin" />,

];
