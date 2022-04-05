import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Team } from '../../types';

export function useTeamApi() {
  const createTeam = (team: Partial<Team>) => {
    return axios.post('/teams', { name: team.name, location: team.location });
  };

  const getTeam = (id: string) => {
    return axios.get(`teams/${id}`);
  };
  const getTeamsByUserId = (userId: string) => {
    return axios.get(`users/${userId}/teams`);
  };

  const joinTeam = (id: string) => {
    return axios.post(`teams/${id}/join`);
  };

  const uploadLogo = (id: string, file: any) => {
    const body = new FormData();
    body.append('file', file, 'filename.jpg');

    console.log('file', file);
    console.log(body);
    return axios.post(
      `teams/${id}/upload`,
      { body },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          boundary: 'file',
        },
      },
    );
  };

  return { createTeam, getTeam, getTeamsByUserId, joinTeam, uploadLogo };
}
