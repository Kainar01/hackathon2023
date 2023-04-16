import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';

export const ORDER_API_REDUCER_KEY = 'orderApi';

const orderApi = createApi({
  reducerPath: ORDER_API_REDUCER_KEY,
  baseQuery,
  endpoints: (builder) => ({
    getOrders: builder.query<any, void>({
      query: () => '/request/order-services',
    }),
    getProviders: builder.query<any, void>({
      query: () => '/providers',
    }),
    getRequestUserId: builder.mutation<any, void>({
      query: () => ({
        url: 'request/order-services/1',
        method: 'POST',
      }),
    }),
    getClientByIIN: builder.query<any, number>({
      query: (iin) => `/egov-api/fl/${iin}`,
    }),
    getClientPhone: builder.query<any, number>({
      query: (iin) => `/egov-api/phone/${iin}`,
    }),
    requestOrderDelivery: builder.mutation<any, any>({
      query: (body) => ({
        url: 'request/order-delivery',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default orderApi;
