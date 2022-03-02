import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from './src/common/theme';

import Navigation from './src/common/navigation';
import SafeAreaView from './src/common/components/SafeAreaView';

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
