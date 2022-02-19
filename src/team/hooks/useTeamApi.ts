import axios from 'axios';

export function useTeamApi() {
  const createTeam = (team: any) => {
    return axios.post('/team', { name: team.name, location: team.location });
  };

  const getTeamsByUserId = (userId: string) => {
    return axios.get(`user/${userId}/teams`);
  };

  return { createTeam, getTeamsByUserId };
}
