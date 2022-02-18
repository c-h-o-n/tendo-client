import axios, { AxiosError, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor, { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { setAccessToken, setRefreshToken } from '../redux/actions';
import TokenService from '../utilities/TokenService';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { API_URL } from 'react-native-dotenv';
import { useToast } from 'native-base';

export default async function useAxiosConfig() {
  const baseURL = API_URL;
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state: any) => state.userReducer);

  axios.defaults.baseURL = baseURL;
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

  // NETWORK ERROR
  const toast = useToast();
  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.message === 'Network Error') {
      return toast.show({ description: 'network error' });
    }

    return Promise.reject(error);
  });

  // 401 - Unauthorized
  const refreshAuthLogic = async (failedRequest: any): Promise<any> => {
    console.log('expired access token');
    const refreshToken = await TokenService.getRefreshToken();
    return axios
      .post('auth/refresh', { refresh_token: refreshToken }, {
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig)
      .then((response: AxiosResponse) => {
        console.log('successful refresh');
        dispatch(setAccessToken(response.data.access_token));
        dispatch(setRefreshToken(response.data.refresh_token));
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
        SecureStore.setItemAsync('accessToken', response.data.access_token);
        SecureStore.setItemAsync('refreshToken', response.data.refresh_token);
        return Promise.resolve();
      })
      .catch((error: AxiosError) => {
        console.log('refresh error:', error);
        console.log('logout');
        SecureStore.deleteItemAsync('accessToken');
        dispatch(setAccessToken(null));
        SecureStore.deleteItemAsync('refreshToken');
        dispatch(setRefreshToken(null));
        return Promise.reject();
      });
  };

  createAuthRefreshInterceptor(axios, refreshAuthLogic, {});

  return accessToken;
}
