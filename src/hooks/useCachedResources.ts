import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';

import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { setAccessToken, setRefreshToken, setUsername } from '../redux/actions';
import jwtDecode from 'jwt-decode';

export default function useCachedResources() {
  const dispatch = useDispatch();

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      console.log('loading...');
      try {
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          lato: require('../assets/fonts/Lato-Regular.ttf'),
        });

        // Load accessToken
        // await SecureStore.deleteItemAsync('accessToken');
        // await SecureStore.deleteItemAsync('refreshToken');
        const accessToken = await SecureStore.getItemAsync('accessToken');
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        console.log(accessToken ? 'I load access Token' : 'No access token loaded');
        console.log(accessToken ? 'I load refresh Token' : 'No refresh token loaded');
        if (accessToken) {
          const { username } = jwtDecode<any>(accessToken);
          console.log(username ? `I load user: ${username}` : 'No user loaded');

          dispatch(setUsername(username));
        }
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setTimeout(() => setLoadingComplete(true), 200);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
