import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import authApi from '../../../api/auth/api';
import {
  ConfirmVerificaitonResponse,
  SendVerificationResponse,
} from '../../../api/auth/types';
import { Button } from '../../../components/button.component';
import { RHFInput } from '../../../components/rhf-input.component';
import { RootStackParamList } from '../../../screens';
import { errorHandler } from '../../../utils';
import { Role } from '../auth.interface';

type FormValuesProps = {
  phoneNumber: string;
  verificationId: number;
  verificationCode: string;
};

export const LoginForm = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FormValuesProps>({
    mode: 'onBlur',
  });

  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [sendVerification, { isLoading: isSendVerificationLoading }] =
    authApi.endpoints.sendVerification.useMutation();
  const [confirmVerification, { isLoading: isConfirmLoading }] =
    authApi.endpoints.confirmVerification.useMutation();

  const verificationId = watch('verificationId');

  const handleFormSubmit = (value: FormValuesProps) => {
    if (verificationId) {
      return handleConfirmVerificaiton(value);
    }
    return handleSendVerification(value);
  };

  const handleSendVerification = (value: FormValuesProps) => {
    return sendVerification(value)
      .unwrap()
      .then(({ verificationId }: SendVerificationResponse) => {
        setValue('verificationId', verificationId);
      })
      .catch(errorHandler);
  };

  const handleConfirmVerificaiton = (value: FormValuesProps) => {
    return confirmVerification(value)
      .unwrap()
      .then((data: ConfirmVerificaitonResponse) => {
        console.log(data)

        if (data.user.roles.includes(Role.CARRIER)) {
          navigate('Carrier');
        } else {
          navigate('Forbidden');
        }
      })
      .catch(errorHandler);
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}>
        <Text style={styles.title}>Введите номер телефона</Text>

        {!verificationId && (
          <RHFInput
            control={control}
            name="phoneNumber"
            rules={{ required: 'Номер телефона' }}
            placeholder="77773050791"
            secureTextEntry={false}
          />
        )}

        {verificationId && (
          <RHFInput
            control={control}
            name="verificationCode"
            rules={{ required: 'Код верификации' }}
            placeholder="123456"
            secureTextEntry={false}
          />
        )}

        <View style={styles.buttonView}>
          <Button
            handlePress={handleSubmit(handleFormSubmit)}
            title={!verificationId ? 'Отправить код' : 'Подтвердить'}
            disabled={isSendVerificationLoading || isConfirmLoading}
          ></Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
    margin: 20,
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
