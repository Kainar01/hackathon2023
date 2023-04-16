import React from 'react';

import { Page } from '~/components/Page';
import { OrderDelivery } from '~/features/client';

export function DeliveryEstimation() {
  return (
    <Page title="Расчет доставки">
      <OrderDelivery />
    </Page>
  );
}
