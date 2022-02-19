// navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import TeamScreen from '../screens/TeamScreen';
import CreateTeamScreen from '../screens/CreateTeamScreen';
import { TeamStackParamList } from './types';

export default function TeamStackNavigator() {
  const Stack = createNativeStackNavigator<TeamStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Team" component={TeamScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateTeam" component={CreateTeamScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
