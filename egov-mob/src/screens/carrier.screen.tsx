import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '.';
import { DeliveryMap } from '../features/delivery/components/delivery-map.component';
import { OrderList } from '../features/delivery/components/orders.component';
import { useDeliveries } from '../features/delivery/use-deliveries.hook';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from '../hooks/useLocation';

export const CarrierScreen = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const coords = useLocation();
  const { deliveries } = useDeliveries(coords.lat, coords.lng);

  const hasDelivery = deliveries.length > 0;

  useEffect(() => {
    if (!user) {
      navigate('Login');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {coords.settled && hasDelivery && <DeliveryMap coords={coords} />}
      {!hasDelivery && <OrderList />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
