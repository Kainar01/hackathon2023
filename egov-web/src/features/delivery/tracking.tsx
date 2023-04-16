/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';

import {
  DirectionsRenderer, GoogleMap, LoadScript, Marker,
} from '@react-google-maps/api';
import { useParams } from 'react-router-dom';

import { useDeliveries } from './use-deliveries.hook';

const colors = ['#FF0000', '#800080', '#008000', '#FFFF00', '#000080', '#0000FF'];

export function MapContainer() {
  const params = useParams();

  const {
    deliveries, carrier, isLoading, deliveryPoints, pickupPoint, unhandedDeliveries,
  } = useDeliveries(+params.carrierId!);

  if (!carrier) {
    return <div>Загрузка...</div>;
  }

  const mapStyles = {
    height: '100vh',
    width: '100%',
  };
  const carrierCoords = {
    latitude: carrier.lat,
    longitude: carrier.lng,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDbPnn37YulAfVfZeYl94lVHkPOM50X8nM">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        {...(carrier && { center: { lat: carrier.lat, lng: carrier.lng } })}
      >
        {pickupPoint && (
          <>
            <Direction from={carrierCoords} to={pickupPoint} />
            <Direction from={pickupPoint} to={deliveryPoints[0]} />
          </>
        )}
        {!pickupPoint && <Direction from={carrierCoords} to={deliveryPoints[0]} />}
        {deliveryPoints.map(
          (point, index) => deliveryPoints[index + 1] && <Direction from={point} to={deliveryPoints[index + 1]} />,
        )}

        {deliveryPoints.map((point, index) => (
          <Marker position={new google.maps.LatLng(point.latitude, point.longitude)}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p style={{ color: 'white' }}>{index + 1}</p>
            </div>
          </Marker>
        ))}

        {pickupPoint && (
          <Marker
            position={new google.maps.LatLng(pickupPoint.latitude, pickupPoint.longitude)}
            icon={{
              url: require('./building.jpg'),
              scale: 7,
            }}
          />
        )}
        <Marker
          position={new google.maps.LatLng(carrier.lat, carrier.lng)}
          icon={{
            url: require('./car.png'),
            scale: 7,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}

type DirectionProps = {
  from: { latitude: number; longitude: number };
  to: { latitude: number; longitude: number };
  color?: string;
};

function Direction({ from, to, color }: DirectionProps) {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const DirectionsService = new google.maps.DirectionsService();

  useEffect(() => {
    (async () => {
      const res = await DirectionsService.route({
        origin: new google.maps.LatLng(41.85073, -87.65126),
        destination: new google.maps.LatLng(41.85258, -87.65141),
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirections(res);
    })();
  }, [from, to]);

  if (!directions) return null;

  return <DirectionsRenderer directions={directions} />;
}
