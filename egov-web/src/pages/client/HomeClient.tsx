import React from 'react';

import { Page } from '~/components/Page';
import { HomeClient } from '~/features/client';

export function HomeClientPage() {
  return (
    <Page title="Кіру">
      <HomeClient />
    </Page>
  );
}
