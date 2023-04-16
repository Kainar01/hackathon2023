import React from 'react';

import { Page } from '~/components/Page';
import { ServicesList } from '~/features/client';

export function ServicesListPage() {
  return (
    <Page title="Сервистер">
      <ServicesList />
    </Page>
  );
}
