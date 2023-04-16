import carrierApi from '../../api/carrier/api';
import _ from 'lodash';
import { getDistance } from 'geolib';
import { useMemo } from 'react';

export const useDeliveries = (lat: number, lng: number) => {
  const { data: deliveries = [], isLoading } =
    carrierApi.endpoints.findActiveDeliveries.useQuery(null, {
      pollingInterval: 3000,
    });

  const data = useMemo(() => {
    const unhandedDeliveries = _.uniqBy(
      deliveries.filter(
        (delivery) => delivery.delivery.status === 'assigned_carrier'
      ),
      ({ request }) => request.organizationName
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

    const deliveryPoints = deliveries
      .map(
        ({
          delivery: { address, ...delivery },
          userRequest,
          requesterUser,
          request,
        }) => ({
          latitude: address.lat,
          longitude: address.lng,
          user: requesterUser,
          address,
          request,
          delivery,
          userRequest,
        })
      )
      .sort(
        (a, b) => getDistance({ lat, lng }, b) - getDistance({ lat, lng }, a)
      );

    return { deliveryPoints, pickupPoint, hasPickup, unhandedDeliveries };
  }, [deliveries, lat, lng]);

  return { deliveries, isLoading, ...data };
};
