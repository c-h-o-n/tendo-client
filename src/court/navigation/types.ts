import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Team } from '../../types';

// CourtStack
export type CourtStackParamList = {
  Court: undefined;
  Chat: undefined;
  TeamDetails: { id: string };
  Matchup: { id: string };
  CreateMatch: { teamB: Team };
  Search: undefined;
};
export type CourtStackScreenProps<Screen extends keyof CourtStackParamList> = NativeStackScreenProps<
  CourtStackParamList,
  Screen
>;
