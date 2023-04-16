import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppScreens from './src/screens';
import { store } from './src/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppScreens />
      </NavigationContainer>
    </Provider>
  );
}
