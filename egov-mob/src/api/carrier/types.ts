import {
  CarrierDelivery,
  CarrierRequest,
} from '../../features/delivery/delivery.interface';

export type FindActiveDeliveriesResponse = Array<CarrierDelivery>;

export type FindActiveDeliveriesRequest = null;

export type UpdateLocationResponse = void;

export interface UpdateLocationRequest {
  lat: number;
  lng: number;
}

export type OrderListResponse = Array<CarrierRequest>;

export type OrderListRequest = void;

export type CompleteOrderResponse = void;

export interface CompleteOrderRequest {
  userRequestId: number;
  clientCode: string;
}

export interface AcceptDeliveryRequest {
  userRequestIds: number[];
}

export type AcceptDeliveryResponse = void;
