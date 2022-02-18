import { BottomTabScreenProps as NativeBottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// RootStack
export type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList | PublicStackParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};
export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

// BottomTab
export type BottomTabParamList = {
  Home: HomeStackParamList | undefined;
  Team: TeamStackParamList | undefined;
  Calendar: undefined;
  Profile: undefined;
};
export type BottomTabScreenProps<Screen extends keyof BottomTabParamList> = CompositeScreenProps<
  NativeBottomTabScreenProps<BottomTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

// HomeStack
export type HomeStackParamList = {
  Court: undefined;
  Chat: undefined;
};
export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> = NativeStackScreenProps<
  HomeStackParamList,
  Screen
>;

// TeamStack
export type TeamStackParamList = {
  Home: undefined;
  CreateTeam: undefined;
};
export type TeamStackScreenProps<Screen extends keyof TeamStackParamList> = NativeStackScreenProps<
  TeamStackParamList,
  Screen
>;
// PublicStack
export type PublicStackParamList = {
  Login: undefined;
  Register: undefined;
};
export type PublicStackScreenProps<Screen extends keyof PublicStackParamList> = NativeStackScreenProps<
  PublicStackParamList,
  Screen
>;
