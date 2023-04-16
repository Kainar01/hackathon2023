import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithLogout } from '..';
import { PostVerification, PostConfirmation } from './type';

export const CLIENT_API_REDUCER_API = 'clientApi';

const clientApi = createApi({
  reducerPath: CLIENT_API_REDUCER_API,
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    getVerificationCode: builder.mutation<any, PostVerification >({
      query: (body) => ({
        url: '/auth/client/verification/send',
        method: 'POST',
        body,
      }),
    }),
    sendVerificationCode: builder.mutation<any, PostConfirmation>({
      query: (body) => ({
        url: '/auth/client/verification/confirm',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default clientApi;
