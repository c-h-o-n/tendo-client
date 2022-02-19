import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAxiosConfig from '../hooks/useAxiosConfig';
import useCachedResources from '../hooks/useCachedResources';
import { RootStackParamList } from './types';

// navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import AuthStackNavigator from '../../auth/navigation/AuthStackNavigator';

// screens
import SplashScreen from '../screens/SplashScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
export default function RootNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const isLoadingComplete = useCachedResources();

  useAxiosConfig();

  // check tokens
  useEffect(() => {
    if (isLoadingComplete) {
      axios
        .get('/')
        .then((response: AxiosResponse) => {
          console.log('check tokens response:', response);
        })
        .catch((error: AxiosError) => {
          console.log("can't reach protect route", error);
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

  function Authenticator() {
    const { accessToken } = useSelector((state: any) => state.userReducer);

    return accessToken ? <BottomTabNavigator /> : <AuthStackNavigator />;
  }
}
