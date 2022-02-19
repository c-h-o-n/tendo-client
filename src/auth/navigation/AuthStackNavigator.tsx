// navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import SignInScreen from '../sign-in/SignInScreen';
import SignUpScreen from '../sign-up/SignUpScreen';

// types
import { AuthStackParamList } from './types';

export default function AuthStackNavigator() {
  const Stack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: true, title: '', headerTransparent: true, animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
}
