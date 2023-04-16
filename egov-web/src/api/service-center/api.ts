import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';

export const SERVICE_CENTER_API_REDUCER_KEY = 'serviceCenterApi';

const serviceCenterApi = createApi({
  reducerPath: SERVICE_CENTER_API_REDUCER_KEY,
  baseQuery,
  endpoints: (builder) => ({
    getPendingOrders: builder.query<any, any>({
      query: () => ({
        url: '/request/order/operator',
        method: 'GET',

      }),
    }),
    getApprovedOrders: builder.query<any, any>({
      query: () => ({
        url: '/request/order/operator?status=in_progress',
        method: 'GET',
      }),
    }),
    approveDelivery: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/request/approve-delivery/${credentials}`,
        method: 'POST',
      }),
    }),
    handoutOrder: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/request/hand-docs/${credentials.id}/carrier`,
        method: 'POST',
        body: { operatorCode: credentials.operatorCode },
      }),
    }),

  }),
});

export default serviceCenterApi;
