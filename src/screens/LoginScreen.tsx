import { Controller, useForm } from 'react-hook-form';

// theme
import { View, Button, Input, Column, Text, Image, useColorMode, Icon, IconButton } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { Emoji } from '../theme';
import Emojicon from 'react-native-emoji';

// types
import { PublicStackScreenProps } from '../navigation/types';

// redux
import { useDispatch } from 'react-redux';
import { setAccessToken, setRefreshToken, setUserId, setUsername } from '../redux/actions';
// persist data
import * as SecureStore from 'expo-secure-store';

// api calls
//TODO move to a service layer
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

export default function LoginScreen({ navigation }: PublicStackScreenProps<'Login'>) {
  const { control, handleSubmit } = useForm();
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();

  const onSubmit = ({ username, password }: { username: string; password: string }) => {
    axios
      .post('auth/signin', { username: username, password: password }, {
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig)
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
    <View justifyContent={'center'} alignItems={'center'}>
      <IconButton
        m={2}
        mb="auto"
        alignSelf="flex-end"
        onPress={toggleColorMode}
        icon={<Icon as={FontAwesome5} name={colorMode === 'dark' ? 'sun' : 'moon'} />}
      />
      <Image
        source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
        alt={'App logo'}
        size={'xl'}
        borderRadius={100}
        mb={40}
      />
      <Column
        w={{
          base: '75%',
          md: '25%',
        }}
        space={12}
        alignItems={'center'}
      >
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
        <Button variant={'link'} onPress={() => navigation.navigate('Register')}>
          Create an account
        </Button>
        <Text>{process.env.NODE_ENV}</Text>
      </Column>
    </View>
  );
}
