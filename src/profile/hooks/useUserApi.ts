import axios from 'axios';

export function useUserApi() {
  const getUserByUsername = (username: string) => {
    return axios.get(`user/${username}`);
  };
  return { getUserByUsername };
}
