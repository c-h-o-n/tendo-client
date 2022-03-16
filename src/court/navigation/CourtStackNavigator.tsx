// navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import ChatScreen from '../../chat/ChatScreen';
import CourtScreen from '@court/CourtScreen';
import TeamDetailsScreen from '@team/team-details/TeamDetailsScreen';
import MatchupScreen from '../../match/MatchupScreen';

// types
import { CourtStackParamList } from './types';

export default function CourtStackNavigator() {
  const Stack = createNativeStackNavigator<CourtStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Court" component={CourtScreen} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: true, title: '', headerTransparent: true, animation: 'slide_from_right' }}
      />
      <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} />
      <Stack.Screen name="Matchup" component={MatchupScreen} />
    </Stack.Navigator>
  );
}
