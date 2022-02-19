// navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import CourtScreen from '../screens/CourtScreen';
import ChatScreen from '../screens/ChatScreen';
import { CourtStackParamList } from '../../common/navigation/types';

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
