import axios from 'axios';
import { Team } from '../../types';

export function useTeamApi() {
  const createTeam = (team: Team) => {
    return axios.post('/teams', { name: team.name, location: team.location });
  };

  const getTeam = (id: string) => {
    return axios.get(`/teams/${id}`);
  };
  const getTeamsByUserId = (userId: string) => {
    return axios.get(`users/${userId}/teams`);
  };

  return { createTeam, getTeam, getTeamsByUserId };
}
