import axios, { AxiosError, AxiosResponse } from 'axios';
import { Button, Heading, useColorMode, View } from 'native-base';
import { useDispatch } from 'react-redux';
import { RootTabScreenProps } from '../types';
import * as SecureStore from 'expo-secure-store';
import { setAccessToken, setRefreshToken } from '../redux/actions';

export default function CourtScreen({ navigation }: RootTabScreenProps<'Court'>) {
  const { colorMode, toggleColorMode } = useColorMode();

  const dispatch = useDispatch();

  const checkNetwork = () => {
    console.log('get protected route');
    axios
      .get('/')
      .then((response: AxiosResponse) => {
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log("can't react protect route", error.response?.status);
      });
  };

  const failedReq = () => {
    axios
      .get('/404error')
      .then((response: AxiosResponse) => {
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log('404 error');
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
      <Heading>Court Works!!!!</Heading>
      <Button mt={5} onPress={toggleColorMode}>
        {`Current mode ${colorMode?.toString()}`}
      </Button>
      <Button mt={5} onPress={checkNetwork}>
        Check token
      </Button>
      <Button mt={5} onPress={failedReq}>
        404 request
      </Button>
      <Button mt={5} onPress={logout}>
        Logout
      </Button>
    </View>
  );
}
