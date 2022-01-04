import { NativeBaseProvider, StatusBar } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';

import LoginScreen from './src/screens/LoginScreen';
import Navigation from './src/navigation';
import SafeAreaView from './src/components/core/SafeAreaView';

import { theme } from './src/theme';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          <SafeAreaView>
            <StatusBar barStyle={'default'} />
            {/* <Navigation /> */}
            <LoginScreen />
          </SafeAreaView>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}
