import { NativeBaseProvider, StatusBar } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from './src/components/core/SafeAreaView';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

import { theme } from './src/theme/theme';

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
            <Navigation />
          </SafeAreaView>
          {/* <LoginScreen /> */}
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}
