import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import carrierApi from '../../../api/carrier/api';
import { CarrierRequest } from '../delivery.interface';
import { OrderDelivery } from './order-delivery.components';

export const OrderList = () => {
  const { data: orders = [] } = carrierApi.endpoints.orderList.useQuery();

  const [order, setOrder] = useState<CarrierRequest | null>(null);

  const handleOrder = (order: CarrierRequest) => {
    setOrder(order);
  };

  const handleClose = () => setOrder(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Доступные заказы </Text>
      {orders.map((order) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleOrder(order)}
        >
          <Text style={{ marginBottom: 8 }}>
            Имя:
            {` ${order.requesterUser.firstName} ${order.requesterUser.lastName}`}
          </Text>
          <Text style={{ marginBottom: 8 }}>
            Телефон:{` ${order.requesterUser.phone}`}
          </Text>
          <Text style={{ marginBottom: 8 }}>
            Документ:{` ${order.request.serviceName}`}
          </Text>
        </TouchableOpacity>
      ))}
      {order && (
        <OrderDelivery order={order} orders={orders} onClose={handleClose} />
      )}
      {orders.length === 0 && <Text>Нет заказов</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '90%',
    marginTop: 16,
  },
  card: {
    marginTop: 16,
    alignSelf: 'stretch',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    padding: 12,
    shadowOpacity: 0.15,
    shadowRadius: 2,
    borderRadius: 12,
    elevation: 2,
    width: '100%',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    fontHeight: 20,
    marginBottom: 16
  },
});
