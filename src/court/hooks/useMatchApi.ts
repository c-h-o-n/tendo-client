import axios from 'axios';

export default function useMatchApi() {
  const getMatch = (id: string) => {
    return axios.get(`match/${id}`);
  };
  const getUpcomingFixtures = (userId: string) => {
    return axios.get(`users/${userId}/fixtures`);
  };
  return { getMatch, getUpcomingFixtures };
}
