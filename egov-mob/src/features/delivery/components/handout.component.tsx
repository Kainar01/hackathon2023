import carrierApi from '../../../api/carrier/api';
import {  UserRequest } from '../delivery.interface';
import {
  StyleSheet,
  Modal,
  View,
  KeyboardAvoidingView,
  Text,
  Image,
} from 'react-native';
import { RHFInput } from '../../../components/rhf-input.component';
import { Button } from '../../../components/button.component';
import { useForm } from 'react-hook-form';
import { errorHandler } from '../../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

type FormValuesProps = {
  clientCode: string;
};

type Props = {
  userRequest: UserRequest;
  onClose: VoidFunction;
};
export const Handout = ({ userRequest, onClose }: Props) => {
  const [handDocsToClient, { isLoading }] =
    carrierApi.endpoints.handDocsToClient.useMutation();

  const { control, handleSubmit } = useForm<FormValuesProps>({
    mode: 'onBlur',
  });

  const handleDocs = (value: FormValuesProps) => {
    handDocsToClient({ ...value, userRequestId: userRequest.id })
      .unwrap()
      .then(onClose)
      .catch(errorHandler);
  };

  return (
    <KeyboardAvoidingView>
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
              <Text style={styles.title}>Введите код от клиента</Text>
              <RHFInput
                control={control}
                name="clientCode"
                rules={{ required: 'Код' }}
                placeholder="1234"
                secureTextEntry={false}
              />

              <View style={styles.buttonView}>
                <Button
                  handlePress={handleSubmit(handleDocs)}
                  title={'Подтвердить'}
                  disabled={isLoading}
                ></Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
