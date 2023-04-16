import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../config';
import {
  AcceptDeliveryRequest,
  AcceptDeliveryResponse,
  CompleteOrderRequest,
  CompleteOrderResponse,
  FindActiveDeliveriesRequest,
  FindActiveDeliveriesResponse,
  OrderListRequest,
  OrderListResponse,
  UpdateLocationRequest,
  UpdateLocationResponse,
} from './types';

export const CARRIER_API_REDUCER_KEY = 'carrierApi';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

const carrierApi = createApi({
  reducerPath: CARRIER_API_REDUCER_KEY,
  baseQuery,
  tagTypes: ['ORDER_LIST'],
  endpoints: (builder) => ({
    updateLocation: builder.mutation<
      UpdateLocationResponse,
      UpdateLocationRequest
    >({
      query: (body) => ({
        url: '/carrier',
        method: 'PUT',
        body,
      }),
    }),
    findActiveDeliveries: builder.query<
      FindActiveDeliveriesResponse,
      FindActiveDeliveriesRequest
    >({
      query: () => ({
        url: '/carrier/deliveries',
        method: 'GET',
      }),
    }),
    orderList: builder.query<OrderListResponse, OrderListRequest>({
      query: () => ({
        url: '/request/order/carrier',
        method: 'GET',
      }),
      providesTags: [{type: "ORDER_LIST"}]
    }),
    handDocsToClient: builder.mutation<
      CompleteOrderResponse,
      CompleteOrderRequest
    >({
      query: ({ userRequestId, ...body }) => ({
        url: `/request/hand-docs/${userRequestId}/client`,
        method: 'POST',
        body,
      }),
    }),
    acceptDelivery: builder.mutation<
      AcceptDeliveryResponse,
      AcceptDeliveryRequest
    >({
      query: (body) => ({
        url: `/request/accept-delivery/create/bulk`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: "ORDER_LIST"}]
    }),
  }),
});

export default carrierApi;
