// navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import CourtScreen from '../court/CourtScreen';
import ChatScreen from '../chat/ChatScreen';
import { CourtStackParamList } from './types';
import TeamDetailsScreen from '@team/team-details/TeamDetailsScreen';

export default function CourtStackNavigator() {
  const Stack = createNativeStackNavigator<CourtStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Court" component={CourtScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: '', headerTransparent: true, animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="TeamDetails"
        component={TeamDetailsScreen}
        options={{ headerShown: false, title: '', headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}
