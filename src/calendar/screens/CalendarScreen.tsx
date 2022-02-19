import axios, { AxiosError, AxiosResponse } from 'axios';
import { View, Button, useColorMode } from 'native-base';
import { useDispatch } from 'react-redux';

import * as SecureStore from 'expo-secure-store';
import { setAccessToken, setRefreshToken } from '../../redux/actions';

export default function CalendarScreen() {
  const { colorMode, toggleColorMode } = useColorMode();

  const dispatch = useDispatch();
  // BUG after navigating back from chat on checkNetwork() and color mode change the app renavigate to court
  const checkNetwork = () => {
    console.log('get protected route');
    axios
      .get('/')
      .then((response: AxiosResponse) => {
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log("can't react protect route", error.message);
      });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    dispatch(setAccessToken(null));
    await SecureStore.deleteItemAsync('refreshToken');
    dispatch(setRefreshToken(null));
    console.log('deleted');
  };

  return (
    <View justifyContent={'flex-start'} alignItems={'center'}>
      <Button mt={5} onPress={toggleColorMode}>
        {`Current mode ${colorMode?.toString()}`}
      </Button>
      <Button mt={5} onPress={checkNetwork}>
        Check token
      </Button>
      <Button mt={5} onPress={logout}>
        Logout
      </Button>
    </View>
  );
}
