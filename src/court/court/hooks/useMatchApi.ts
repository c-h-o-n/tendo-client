import axios from 'axios';

export default function useMatchApi() {
  const getUpcomingFixtures = (userId: string) => {
    return axios.get(`users/${userId}/fixtures`);
  };
  return { getUpcomingFixtures };
}
