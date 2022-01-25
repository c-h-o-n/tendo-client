import { NativeBaseProvider, StatusBar, useColorMode } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from './src/theme';

import SafeAreaView from './src/components/core/SafeAreaView';
import Navigation from './src/navigation';

import useCachedResources from './src/hooks/useCachedResources';
// redux
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { Store } from './src/redux/store';
export default function App() {
  const { colorMode } = useColorMode();

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <SafeAreaView>
          <ReduxProvider store={Store}>
            <Navigation />
          </ReduxProvider>
        </SafeAreaView>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
