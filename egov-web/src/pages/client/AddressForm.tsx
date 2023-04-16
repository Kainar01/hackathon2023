import React from 'react';

import { Page } from '~/components/Page';
import { AddressFormClient } from '~/features/client';

export function AddressFormPage() {
  return (
    <Page title="Доставка">
      <AddressFormClient />
    </Page>
  );
}
