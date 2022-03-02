/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          SignIn: {
            screens: {
              LoginScreen: 'signin',
            },
          },
          SignUp: {
            screens: {
              RegisterScreen: 'signup',
            },
          },
          Court: {
            screens: {
              CourtScreen: 'court',
            },
          },
          Team: {
            screens: {
              TeamScreen: 'team',
            },
          },
          Calendar: {
            screens: {
              CalendarScreen: 'calendar',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
