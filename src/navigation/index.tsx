import { NavigationContainer } from '@react-navigation/native';
import LinkingConfiguration from './LinkingConfiguration';

import { StatusBar, useColorMode } from 'native-base';

import RootNavigator from './RootNavigator';
import { NavigationDarkTheme, NavigationLightTheme } from '../utilities/theme';

export default function Navigation() {
  const { colorMode } = useColorMode();

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorMode === 'dark' ? NavigationDarkTheme : NavigationLightTheme}
    >
      <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} />
      <RootNavigator />
    </NavigationContainer>
  );
}
