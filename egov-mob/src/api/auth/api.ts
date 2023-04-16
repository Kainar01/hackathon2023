import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../config';
import {
  ConfirmVerificaitonRequest,
  ConfirmVerificaitonResponse,
  SendVerificationRequest,
  SendVerificationResponse,
} from './types';

export const AUTH_API_REDUCER_KEY = 'authApi';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery,
  endpoints: (builder) => ({
    sendVerification: builder.mutation<
      SendVerificationResponse,
      SendVerificationRequest
    >({
      query: (credentials) => ({
        url: '/auth/verification/send',
        method: 'POST',
        body: credentials,
      }),
    }),
    confirmVerification: builder.mutation<
      ConfirmVerificaitonResponse,
      ConfirmVerificaitonRequest
    >({
      query: (credentials) => ({
        url: '/auth/verification/confirm',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export default authApi;
