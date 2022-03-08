import axios from 'axios';

export default function useMatchApi() {
  const getUpcomingFixtures = (userId: string) => {
    return axios.get(`match/${userId}`);
  };
  return { getUpcomingFixtures };
}
