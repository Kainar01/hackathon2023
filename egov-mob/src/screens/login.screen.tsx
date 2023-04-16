import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { LoginForm } from '../features/auth/components/login-form.component';

export const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
