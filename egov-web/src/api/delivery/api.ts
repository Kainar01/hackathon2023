import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { FindDeliveriesForCarrier, FindDeliveriesForCarrierResponse } from './type';

export const DELIVERY_API_REDUCER_KEY = 'deliveryApi';

const deliveryApi = createApi({
  reducerPath: DELIVERY_API_REDUCER_KEY,
  baseQuery,
  endpoints: (builder) => ({
    findActiveDeliveries: builder.query<FindDeliveriesForCarrierResponse, FindDeliveriesForCarrier>(
      {
        query: (carrierId: number) => ({
          url: `/carrier/deliveries/${carrierId}`,
          method: 'GET',
        }),
      },
    ),
  }),
});

export default deliveryApi;
