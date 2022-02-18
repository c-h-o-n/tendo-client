// navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import CreateTeamScreen from '../screens/CreateTeamScreen';
import TeamScreen from '../screens/TeamScreen';

export default function TeamStackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="TeamHome" component={TeamScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateTeam" component={CreateTeamScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
