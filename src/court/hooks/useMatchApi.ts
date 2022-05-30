import axios from 'axios';

export default function useMatchApi() {
  const createMatch = (match: any) => {
    return axios.post('match', match);
  };

  const getMatch = (id: string) => {
    return axios.get(`match/${id}`);
  };

  const getUpcomingFixtures = (userId: string) => {
    return axios.get(`users/${userId}/fixtures`);
  };

  const updateMatch = (id: string, data: any) => {
    return axios.patch(`match/${id}`, data);
  };
  return { createMatch, getMatch, getUpcomingFixtures, updateMatch };
}
