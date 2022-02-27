import axios from 'axios';

export function useTeamApi() {
  const createTeam = (team: any) => {
    return axios.post('/teams', { name: team.name, location: team.location });
  };

  const getTeamsByUserId = (userId: string) => {
    return axios.get(`users/${userId}/teams`);
  };

  return { createTeam, getTeamsByUserId };
}
