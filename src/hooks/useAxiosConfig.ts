import axios, { AxiosError, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor, {
  AxiosAuthRefreshRequestConfig,
} from 'axios-auth-refresh';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { setAccessToken, setRefreshToken } from '../redux/actions';

export default function useAxiosConfig() {
  const baseURL = 'http://localhost:3000/';
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  }, [accessToken]);

  const refreshAuthLogic = async (failedRequest: any): Promise<any> => {
    console.log('expired access token');
    return axios
      .post('auth/refresh', { refresh_token: refreshToken }, {
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig)
      .then((response: AxiosResponse) => {
        console.log('successful refresh');
        dispatch(setAccessToken(response.data.access_token));
        dispatch(setRefreshToken(response.data.refresh_token));
        failedRequest.response.config.headers['Authorization'] =
          'Bearer ' + response.data.access_token;
        SecureStore.setItemAsync('accessToken', response.data.access_token);
        SecureStore.setItemAsync('refreshToken', response.data.refresh_token);
        return Promise.resolve();
      })
      .catch((error: AxiosError) => {
        console.log('refresh error:', error.message);
        console.log('logout');
        SecureStore.deleteItemAsync('accessToken');
        dispatch(setAccessToken(null));
        SecureStore.deleteItemAsync('refreshToken');
        dispatch(setRefreshToken(null));
        return Promise.reject();
      });
  };
  useEffect(() => {
    if (refreshToken) {
      createAuthRefreshInterceptor(axios, refreshAuthLogic, {});
    }
  }, [refreshToken]);

  return accessToken;
}
