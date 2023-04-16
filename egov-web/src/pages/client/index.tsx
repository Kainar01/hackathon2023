import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { LoginClientPage } = lazyImport(() => import('./LoginClient'), 'LoginClientPage');
const { ServicesListPage } = lazyImport(() => import('./ServicesList'), 'ServicesListPage');
const { ServicePage } = lazyImport(() => import('./ServicePage'), 'ServicePage');
const { AddressFormPage } = lazyImport(() => import('./AddressForm'), 'AddressFormPage');
const { DeliveryEstimation } = lazyImport(
  () => import('./DeliveryEstimation'),
  'DeliveryEstimation',
);

export const ClientRoutes = [
  <Route path="request/:requestId" element={<LoginClientPage />} key="requestId" />,
  <Route path="services" element={<ServicesListPage />} key="services-list-client" />,
  <Route path="services/:id" element={<ServicePage />} key="service-page" />,
  <Route path="services/:id/address" element={<AddressFormPage />} key="service-address" />,
  <Route path="services/:id/delivery" element={<DeliveryEstimation />} key="service-delivery" />,
];
