import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

import { theme } from './src/common/theme';

import Navigation from './src/common/navigation';
import SafeAreaView from './src/common/components/SafeAreaView';

// redux
import { Provider as ReduxProvider } from 'react-redux';
import { Store } from './src/redux/store';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// LATER cleanup here
// LATER cleanup dependecies => update rest
// LATER maybe delete "useNextNotificationsApi": true from app.json
export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log('token registered: ', token));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync({ experienceId: '@chon76/tendo' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  // LATER refresh on pull down
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
