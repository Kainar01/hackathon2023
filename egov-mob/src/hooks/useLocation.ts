import { useEffect, useState } from 'react';
import carrierApi from '../api/carrier/api';

import * as Location from 'expo-location';

export const useLocation = () => {
  const [coords, setCoors] = useState({ lat: 0, lng: 0, settled: false });
  const [updateLocation] = carrierApi.endpoints.updateLocation.useMutation();

  useEffect(() => {
    const interval = setInterval(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});

      const data = {
        lat: latitude,
        lng: longitude,
      };

      setCoors({ ...data, settled: true });
      updateLocation(data);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return coords;
};
