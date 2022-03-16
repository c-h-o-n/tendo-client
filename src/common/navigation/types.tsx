import { BottomTabScreenProps as NativeBottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../auth/navigation/types';
import { CourtStackParamList } from '../../court/navigation/types';
import { TeamStackParamList } from '../../team/navigation/types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// RootStack
export type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList | AuthStackParamList>;
  NotFound: undefined;
};
export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

// BottomTab
export type BottomTabParamList = {
  CourtStack: NavigatorScreenParams<CourtStackParamList>;
  TeamStack: NavigatorScreenParams<TeamStackParamList>;
  CalendarStack: undefined;
  ProfileStack: undefined;
};
export type BottomTabScreenProps<Screen extends keyof BottomTabParamList> = CompositeScreenProps<
  NativeBottomTabScreenProps<BottomTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
