import { useMemo } from 'react';

import { getDistance } from 'geolib';
import _ from 'lodash';

import deliveryApi from '../../api/delivery/api';

export const useDeliveries = (carrierId: number) => {
  const { data: { deliveries = [], carrier = null } = {}, isLoading } = deliveryApi
    .endpoints.findActiveDeliveries.useQuery(carrierId, {
      pollingInterval: 3000,
    });

  const data = useMemo(() => {
    const unhandedDeliveries = _.uniqBy(
      deliveries.filter((delivery) => delivery.delivery.status === 'assigned_carrier'),
      ({ request }) => request.organizationName,
    );

    const hasPickup = unhandedDeliveries.length > 0;

    const pickupRequest = unhandedDeliveries[0]?.request;

    const pickupPoint = pickupRequest
      ? {
        latitude: pickupRequest.organizationLat,
        longitude: pickupRequest.organizationLng,
        name: pickupRequest.organizationName,
      }
      : null;

    let deliveryPoints = deliveries.map(
      ({
        delivery: { address, ...delivery }, userRequest, requesterUser, request,
      }) => ({
        latitude: address.lat,
        longitude: address.lng,
        user: requesterUser,
        address,
        request,
        delivery,
        userRequest,
      }),
    );

    if (carrier) {
      const { lat, lng } = carrier;
      deliveryPoints = deliveryPoints.sort(
        (a, b) => getDistance({ lat, lng }, b) - getDistance({ lat, lng }, a),
      );
    }

    return {
      deliveryPoints,
      pickupPoint,
      hasPickup,
      unhandedDeliveries,
    };
  }, [deliveries, carrier]);

  return {
    deliveries, carrier, isLoading, ...data,
  };
};
