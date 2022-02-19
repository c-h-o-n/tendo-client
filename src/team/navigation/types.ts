import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TeamStackParamList = {
  Team: undefined;
  CreateTeam: undefined;
};

export type TeamStackScreenProps<Screen extends keyof TeamStackParamList> = NativeStackScreenProps<
  TeamStackParamList,
  Screen
>;
