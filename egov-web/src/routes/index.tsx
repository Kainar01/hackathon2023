import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MapContainer } from '~/features/delivery';
import { AdminRoutes } from '~/pages/admin';
import { AuthRoutes } from '~/pages/auth';
import { ClientRoutes } from '~/pages/client';
import { MiscRoutes } from '~/pages/misc';
import { ServiceSenterRoutes } from '~/pages/service-center';
import { lazyImport } from '~/utils/lazyImport';

const { Page404 } = lazyImport(() => import('~/pages/misc/Page404'), 'Page404');

export function AppRoutes() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
      <Routes>
        {MiscRoutes}
        {AuthRoutes}
        {AdminRoutes}
        <Route path="tracking/:carrierId" element={<MapContainer />} />
        <Route path="/client/*">{ClientRoutes}</Route>
        {ServiceSenterRoutes}
        <Route path="*" element={<Page404 />} key="404" />
      </Routes>
    </BrowserRouter>
  );
}
