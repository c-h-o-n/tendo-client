/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { useColorMode, useTheme } from 'native-base';

// screens
import CalendarScreen from '../screens/CalendarScreen';
import CourtScreen from '../screens/CourtScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TeamScreen from '../screens/TeamScreen';

export default function Navigation() {
  const { colorMode } = useColorMode();
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/doxcs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  const { colors } = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Court"
      screenOptions={{
        tabBarActiveTintColor: colors.primary[400],
        tabBarInactiveTintColor: colors.warmGray[400],
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Court"
        component={CourtScreen}
        options={({ navigation }: RootTabScreenProps<'Court'>) => ({
          title: 'Court',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="clipboard" color={color} solid={focused ? true : false} />,
        })}
      />
      <BottomTab.Screen
        name="Team"
        component={TeamScreen}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="users" color={color} solid={false} />,
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="calendar" color={color} solid={focused ? true : false} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="user" color={color} solid={focused ? true : false} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome5>['name']; color: string; solid: boolean }) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} outline />;
}
