import React from 'react';

import { Page } from '~/components/Page';
import { LoginClient } from '~/features/client';

export function LoginClientPage() {
  return (
    <Page title="Сервис">
      <LoginClient />
    </Page>
  );
}
