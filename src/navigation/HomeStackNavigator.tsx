// navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatScreen';

// screens
import CourtScreen from '../screens/CourtScreen';

export default function HomeStackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Court" component={CourtScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: true, title: '', headerTransparent: true, animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
