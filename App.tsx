import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from './src/common/theme';

import Navigation from './src/common/navigation';
import SafeAreaView from './src/common/components/SafeAreaView';

// redux
import { Provider as ReduxProvider } from 'react-redux';
import { Store } from './src/redux/store';

import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

async function getNotToken() {
  try {
    const token = (await Notifications.getExpoPushTokenAsync({ experienceId: '@chon76/tendo' })).data;

    console.log('expo push token: ', token);
    return token;
  } catch (error) {
    console.log(error);
  }
}
export default function App() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    getNotToken();
  }, []);

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
