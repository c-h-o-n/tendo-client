import { NativeStackScreenProps } from '@react-navigation/native-stack';

// CourtStack
export type CourtStackParamList = {
  Court: undefined;
  Chat: undefined;
};
export type CourtStackScreenProps<Screen extends keyof CourtStackParamList> = NativeStackScreenProps<
  CourtStackParamList,
  Screen
>;