import axios from 'axios';
import { Team } from '../../types';

export function useTeamApi() {
  const createTeam = (team: Partial<Team>) => {
    return axios.post('/teams', { name: team.name, location: team.location });
  };

  const getTeamsByUserId = (userId: string) => {
    return axios.get(`users/${userId}/teams`);
  };

  return { createTeam, getTeamsByUserId };
}
