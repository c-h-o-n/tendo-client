import axios from 'axios';
import { Team } from '../../types';

export function useTeamApi() {
  const createTeam = (team: Partial<Team>) => {
    return axios.post('/teams', { name: team.name, location: team.location });
  };

  const getTeam = (id: string) => {
    return axios.get(`/teams/${id}`);
  };
  const getTeamsByUserId = (userId: string) => {
    return axios.get(`users/${userId}/teams`);
  };

  const joinTeam = (id: string) => {
    return axios.post(`teams/${id}/join`);
  };

  return { createTeam, getTeam, getTeamsByUserId, joinTeam };
}
