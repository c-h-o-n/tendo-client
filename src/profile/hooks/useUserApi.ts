import axios from 'axios';

export function useUserApi() {
  const getUserByUsername = (username: string) => {
    return axios.get(`users/${username}`);
  };

  return { getUserByUsername };
}
