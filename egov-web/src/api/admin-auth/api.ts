import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import {
  SendRequest, SendResponse, ConfirmRequest, ConfirmResponse,
} from './types';

export const ADMIN_AUTH_API_REDUCER_KEY = 'adminAuthApi';

const adminAuthApi = createApi({
  reducerPath: ADMIN_AUTH_API_REDUCER_KEY,
  baseQuery,
  endpoints: (builder) => ({
    sendVerification: builder.mutation<SendResponse, SendRequest>({
      query: (credentials) => ({
        url: '/auth/verification/send',
        method: 'POST',
        body: credentials,
      }),
    }),
    confirmVerification: builder.mutation<ConfirmResponse, ConfirmRequest>({
      query: (credentials) => ({
        url: 'auth/verification/confirm',
        method: 'POST',
        body: credentials,
      }),
    }),
    createOperator: builder.mutation<any, any>({
      query: (body) => ({
        url: 'admin/operators',
        method: 'POST',
        body,
      }),
    }),
    createDeliveryProvider: builder.mutation<any, any>({
      query: (body) => ({
        url: 'admin/carrier-provider',
        method: 'POST',
        body,
      }),
    }),
    getAllOperators: builder.query<any, any>({
      query: () => 'admin/operators',
    }),
  }),
});

export default adminAuthApi;
