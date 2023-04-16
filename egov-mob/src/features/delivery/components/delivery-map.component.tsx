import { useDeliveries } from '../use-deliveries.hook';
import { Image, StyleSheet, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useEffect, useState } from 'react';
import { Handout } from './handout.component';
import { UserRequest } from '../delivery.interface';

type Props = {
  coords: { lat: number; lng: number };
};
const image =
  'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

const colors = [
  '#FF0000',
  '#800080',
  '#008000',
  '#FFFF00',
  '#000080',
  '#0000FF',
];
export const DeliveryMap = ({ coords }: Props) => {
  const {
    deliveries,
    isLoading,
    deliveryPoints,
    pickupPoint,
    unhandedDeliveries,
  } = useDeliveries(coords.lat, coords.lng);

  const [userRequest, setUserRequest] = useState<UserRequest | null>(null);

  const handleHandout = (userRequest: UserRequest) => {
    console.log(userRequest)
    setUserRequest(userRequest);
  };

  const handleCloseHandout = () => {
    setUserRequest(null);
    console.log(userRequest)
  };

  const handlePickup = () => {
    const orders = unhandedDeliveries.length;
    alert(`Вам нужно забрать ${orders} документов с этого ЦОНа`);
  };

  useEffect(() => {
    if (!isLoading && deliveries.length === 0) {
      alert('Ending');
    }
  }, []);

  const carrierCoords = {
    latitude: coords.lat,
    longitude: coords.lng,
  };

  return (
    <>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coords.lat,
          longitude: coords.lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.11,
        }}
      >
        {pickupPoint && (
          <>
            <MapViewDirections
              origin={carrierCoords}
              destination={pickupPoint}
              apikey={'AIzaSyDbPnn37YulAfVfZeYl94lVHkPOM50X8nM'}
              strokeWidth={4}
              strokeColor={colors[0]}
            />
            <MapViewDirections
              origin={pickupPoint}
              destination={deliveryPoints[0]}
              apikey={'AIzaSyDbPnn37YulAfVfZeYl94lVHkPOM50X8nM'}
              strokeWidth={4}
              strokeColor={colors[1]}
            />
          </>
        )}
        {!pickupPoint && (
          <MapViewDirections
            origin={carrierCoords}
            destination={deliveryPoints[0]}
            apikey={'AIzaSyDbPnn37YulAfVfZeYl94lVHkPOM50X8nM'}
            strokeWidth={4}
            strokeColor={colors[1]}
          />
        )}
        {deliveryPoints.map(
          (point, index) =>
            deliveryPoints[index + 1] && (
              <MapViewDirections
                origin={point}
                destination={deliveryPoints[index + 1]}
                apikey={'AIzaSyDbPnn37YulAfVfZeYl94lVHkPOM50X8nM'}
                strokeWidth={4}
                strokeColor={colors[index + 2]}
              />
            )
        )}

        {deliveryPoints.map((point, index) => (
          <Marker
            coordinate={point}
            onPress={() => handleHandout(point.userRequest)}
          >
            <View style={styles.marker}>
              <Text>{index + 1}</Text>
            </View>
          </Marker>
        ))}

        {pickupPoint && (
          <Marker coordinate={pickupPoint} onPress={handlePickup}>
            <Image
              source={require('./building.jpg')}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        )}
        <Marker coordinate={carrierCoords}>
          <Image
            source={require('./car.png')}
            style={{ width: 40, height: 40 }}
          />
        </Marker>
      </MapView>
      {userRequest && <Handout userRequest={userRequest} onClose={handleCloseHandout} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
