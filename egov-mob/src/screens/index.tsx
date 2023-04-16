import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './login.screen';
import { CarrierScreen } from './carrier.screen';
import { ForbiddenScreen } from './forbidden.screen';

export type RootStackParamList = {
  Login: undefined;
  Carrier: undefined;
  Forbidden: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppScreens() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Carrier"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Carrier" component={CarrierScreen} />
      <Stack.Screen
        name="Forbidden"
        component={ForbiddenScreen}
        options={{ title: 'Forbidden' }}
      />
    </Stack.Navigator>
  );
}
