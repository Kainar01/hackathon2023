import carrierApi from '../../../api/carrier/api';
import { CarrierRequest } from '../delivery.interface';
import { StyleSheet, Modal, View, Text, Image } from 'react-native';
import { Button } from '../../../components/button.component';
import { errorHandler } from '../../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  order: CarrierRequest;
  orders: Array<CarrierRequest>;
  onClose: VoidFunction;
};
export const OrderDelivery = ({ orders, order, onClose }: Props) => {
  const [acceptDelivery, { isLoading }] =
    carrierApi.endpoints.acceptDelivery.useMutation();

  const handleDelivery = (order?: CarrierRequest) => {
    let userRequestIds = orders.map(({ userRequest }) => userRequest.id);
    if (order) {
      userRequestIds = [order.userRequest.id];
    }
    console.log(userRequestIds);

    acceptDelivery({ userRequestIds })
      .unwrap()
      .then(onClose)
      .catch(errorHandler);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        style={styles.modalView}
        transparent
        onRequestClose={onClose}
        onDismiss={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.close} onPress={onClose}>
                <Image
                  source={require('./close-50.png')}
                  style={{ height: 24, width: 24 }}
                ></Image>
              </TouchableOpacity>
            </View>
            {orders.length > 1 && (
              <View>
                <Text style={styles.title}>
                  Вы можете взять еще {orders.length - 1} заказа с этого Цона и
                  сэкономить себе время!
                </Text>
                <View style={styles.buttonView}>
                  <Button
                    extraStyles={{ marginBottom: 12 }}
                    handlePress={() => handleDelivery()}
                    title={'Взять все'}
                    disabled={isLoading}
                  ></Button>
                  <Button
                    handlePress={() => handleDelivery(order)}
                    title={'Взять одну'}
                    disabled={isLoading}
                  ></Button>
                </View>
              </View>
            )}

            {orders.length === 1 && (
              <View>
                <Text style={styles.title}>
                  Вы уверены что хочешь принять заказ?
                </Text>
                <View style={styles.buttonView}>
                  <Button
                    extraStyles={{ marginBottom: 12 }}
                    handlePress={() => handleDelivery(order)}
                    title={'Подтвердить'}
                    disabled={isLoading}
                  ></Button>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  close: {},
  header: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
    margin: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    width: '80%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonView: {
    marginVertical: 8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 18,
  },
});
