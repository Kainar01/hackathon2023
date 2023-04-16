import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { ServiceSenterPage } = lazyImport(() => import('./service-center'), 'ServiceSenterPage');

export const ServiceSenterRoutes = [
  <Route path="/service-center" element={<ServiceSenterPage />} key="service-center" />,
];
