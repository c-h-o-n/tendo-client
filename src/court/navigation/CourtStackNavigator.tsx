// navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import CourtScreen from '../court/CourtScreen';
import ChatScreen from '../chat/ChatScreen';
import { CourtStackParamList } from './types';

export default function CourtStackNavigator() {
  const Stack = createNativeStackNavigator<CourtStackParamList>();
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
