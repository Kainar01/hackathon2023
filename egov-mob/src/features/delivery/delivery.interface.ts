export interface CarrierDelivery {
  delivery: Delivery & { address: Address };
  request: Request;
  requesterUser: User;
  userRequest: UserRequest;
}

export type Address = {
  id: number;
  region: string;
  city: string;
  street: string;
  houseNumber: string;
  apartment: string;
  entrance: string;
  floor: string | null;
  block: string;
  name: string;
  comments: string | null;
  userId: number;
  lat: number;
  lng: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface Delivery {
  id: number;
  phone: string;
  addressId: number;
  carrierId: number | null;
  userRequestId: number;
  trustedDeliveryUserId: number | null;
  acceptedByUserId: number | null;
  carrierProviderId: number;
  status: string;
  operatorCode: string;
  clientCode: string;
  deliveredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  iin: string | null;
  password: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  phone: string | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Request {
  id: number;
  requestCode: string;
  serviceName: string;
  serviceCode: string;
  organizationName: string;
  organizationLat: number;
  organizationLng: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRequest {
  id: number;
  requesterUserId: number;
  requestId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CarrierRequest {
  request: Request;
  requesterUser: User;
  userRequest: UserRequest;
  delivery: Delivery;
}
