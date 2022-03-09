import axios from 'axios';
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

export function useAuthApi() {
  const signIn = (username: string, password: string) => {
    return axios.post('auth/signin', { username: username, password: password }, {
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig);
  };

  const signUp = (user: any) => {
    return axios.post('auth/signup', user);
  };

  // LATER implement sign out api call
  const SignOut = () => {
    return;
  };

  return { signIn, signUp, SignOut };
}
