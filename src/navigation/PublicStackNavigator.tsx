import { PublicStackParamList } from './types';

// navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export default function PublicStackNavigator() {
  const Stack = createNativeStackNavigator<PublicStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: true, title: '', headerTransparent: true, animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
}
