/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { PublicRoutesParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { StatusBar, useColorMode, useTheme } from 'native-base';

// screens
import CalendarScreen from '../screens/CalendarScreen';
import CourtScreen from '../screens/CourtScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TeamScreen from '../screens/TeamScreen';
import LoginScreen from '../screens/LoginScreen';

import { useSelector } from 'react-redux';
import useCachedResources from '../hooks/useCachedResources';
import SplashScreen from '../screens/SplashScreen';
import useAxiosConfig from '../hooks/useAxiosConfig';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import RegisterScreen from '../screens/RegisterScreen';

export default function Navigation() {
  const { colorMode } = useColorMode();
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} />
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const isLoadingComplete = useCachedResources();
  const axiosConfig = useAxiosConfig();

  useEffect(() => {
    if (isLoadingComplete) {
      axios
        .get('/')
        .then((response: AxiosResponse) => {
          console.log(response.data);
        })
        .catch((error: AxiosError) => {
          console.log("can't react protect route", error);
        });
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return <SplashScreen />;
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={Authenticator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

function Authenticator() {
  const { accessToken } = useSelector((state: any) => state.userReducer);

  return accessToken ? <BottomTabNavigator /> : <PublicStackNavigator />;
}

// Public Routes
function PublicStackNavigator() {
  const PublicStack = createNativeStackNavigator<PublicRoutesParamList>();

  return (
    <PublicStack.Navigator>
      <PublicStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <PublicStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
          animation: 'slide_from_bottom',
        }}
      />
    </PublicStack.Navigator>
  );
}

// Protected Routes
function BottomTabNavigator() {
  const BottomTab = createBottomTabNavigator<RootTabParamList>();

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

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome5>['name']; color: string; solid: boolean }) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} outline />;
}
