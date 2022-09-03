import { Controller, useForm } from 'react-hook-form';
import { setAccessToken, setRefreshToken, setUserId, setUsername } from '@redux/actions';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';

import { useEffect, useState } from 'react';

// theme
import { View, Button, Input, Column, Text, Image, useColorMode, Icon, IconButton, Heading } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { Emoji } from '../../common/theme';

// types
import { AuthStackScreenProps } from '../navigation/types';
import { AxiosError, AxiosResponse } from 'axios';

// api calls
import { useAuthApi } from '../hooks/useAuthApi';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function SignInScreen({ navigation }: AuthStackScreenProps<'SignIn'>) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { control, handleSubmit } = useForm();
  const [pushToken, setPushToken] = useState('');

  const { signIn } = useAuthApi();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useffect');

    Notifications.getExpoPushTokenAsync({ experienceId: '@chon76/tendo' }).then(({ data: token }) => {
      setPushToken(token);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
      const url = response.notification.request.content.data.url as string;
      const fullurl = Linking.createURL(url);

      if (fullurl) {
        console.log('open url', fullurl);
        Linking.openURL(fullurl).then((c) => console.log(c));
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onSubmit = ({ username, password }: { username: string; password: string }) => {
    return signIn(username, password, pushToken)
      .then((response: AxiosResponse) => {
        dispatch(setAccessToken(response.data.access_token));
        dispatch(setRefreshToken(response.data.refresh_token));
        SecureStore.setItemAsync('accessToken', response.data.access_token);
        SecureStore.setItemAsync('refreshToken', response.data.refresh_token);

        dispatch(setUserId(response.data.id));
        dispatch(setUsername(response.data.username));
        console.log('login as', response.data.username, response.data.id);
      })
      .catch((error: AxiosError) => {
        console.log('login error', error.response?.data.message);
      });
  };

  return (
    <View justifyContent={'space-between'} alignItems={'center'}>
      <IconButton
        m={2}
        mb="auto"
        alignSelf="flex-end"
        onPress={toggleColorMode}
        icon={<Icon as={FontAwesome5} name={colorMode === 'dark' ? 'sun' : 'moon'} />}
      />
      <Column w={'75%'} space={12} alignItems={'center'}>
        <Heading>Tendo</Heading>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <Input
              InputLeftElement={<Emoji name="bust_in_silhouette" />}
              placeholder="username"
              value={value}
              onChangeText={(value) => onChange(value)}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Field is required!',
            },
          }}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              InputLeftElement={<Emoji name="key" />}
              type="password"
              placeholder="password"
              value={value}
              onChangeText={(value) => onChange(value)}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Field is required!',
            },
          }}
        />

        <Button onPress={handleSubmit(onSubmit)}>Login</Button>
        <Button variant={'link'} onPress={() => navigation.navigate('SignUp')}>
          Create an account
        </Button>
        <Text>{process.env.NODE_ENV}</Text>
      </Column>
    </View>
  );
}
