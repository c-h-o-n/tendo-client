// TODO Refactor codebase to feature based
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from './src/theme';

import SafeAreaView from './src/components/core/SafeAreaView';
import Navigation from './src/navigation';

// redux
import { Provider as ReduxProvider } from 'react-redux';
import { Store } from './src/redux/store';
export default function App() {
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
