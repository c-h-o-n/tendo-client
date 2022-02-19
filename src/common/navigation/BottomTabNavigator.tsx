import { useTheme } from 'native-base';
import { BottomTabParamList } from './types';
import { FontAwesome5 } from '@expo/vector-icons';

// navigators
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import CourtStackNavigator from '@court/navigation/CourtStackNavigator';
import TeamStackNavigator from '@team/navigation/TeamStackNavigator';
import CalendarScreen from '@calendar/CalendarScreen';
import ProfileScreen from '@profile/ProfileScreen';

export default function BottomTabNavigator() {
  const BottomTab = createBottomTabNavigator<BottomTabParamList>();
  const { colors } = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="CourtStack"
      screenOptions={{
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.warmGray[500],
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="CourtStack"
        component={CourtStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="clipboard" color={color} solid={focused ? true : false} />,
        }}
      />
      <BottomTab.Screen
        name="TeamStack"
        component={TeamStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="users" color={color} solid={false} />,
        }}
      />
      <BottomTab.Screen
        name="CalendarStack"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="calendar" color={color} solid={focused ? true : false} />,
        }}
      />
      <BottomTab.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="user" color={color} solid={focused ? true : false} />,
        }}
      />
    </BottomTab.Navigator>
  );

  function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome5>['name']; color: string; solid: boolean }) {
    return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} outline />;
  }
}
