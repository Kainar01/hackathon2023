import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { AdminPage } = lazyImport(() => import('./admin'), 'AdminPage');

export const AdminRoutes = [
  <Route path="/admin" element={<AdminPage />} key="admin" />,
];
