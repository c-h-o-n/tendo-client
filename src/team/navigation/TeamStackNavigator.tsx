// navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import TeamListScreen from '../team-list/TeamListScreen';
import CreateTeamScreen from '../create-team/CreateTeamScreen';
import { TeamStackParamList } from './types';

export default function TeamStackNavigator() {
  const Stack = createNativeStackNavigator<TeamStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="TeamList" component={TeamListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateTeam" component={CreateTeamScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
