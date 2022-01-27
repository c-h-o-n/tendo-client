import { View, Button, Input, VStack, Pressable, Text, Image } from 'native-base';
import { Controller, useForm } from 'react-hook-form';

// redux
import { useDispatch } from 'react-redux';
import { setAccessToken, setRefreshToken, setUserName } from '../redux/actions';
// persist data
import * as SecureStore from 'expo-secure-store';

// api calls
// todo: move to a service layer
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  // todo: get from prop
  const nav = useNavigation();

  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit = ({ username, password }: { username: string; password: string }) => {
    axios
      .post('auth/login', { username: username, password: password }, {
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig)
      .then((response: AxiosResponse) => {
        dispatch(setAccessToken(response.data.access_token));
        dispatch(setRefreshToken(response.data.refresh_token));
        SecureStore.setItemAsync('accessToken', response.data.access_token);
        SecureStore.setItemAsync('refreshToken', response.data.refresh_token);
        dispatch(setUserName(username));
        console.log('login as', username);
      })
      .catch((error: AxiosError) => {
        console.log('login error', error.response?.data.message);
      });
  };

  return (
    <View justifyContent={'center'} alignItems={'center'} bg={'primary.400'}>
      <Image
        source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
        alt={'App logo'}
        size={'xl'}
        borderRadius={100}
        mb={40}
      />
      <VStack
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
            <Input w="100%" size="lg" placeholder="username" value={value} onChangeText={(value) => onChange(value)} />
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
              w="100%"
              size="lg"
              type="password"
              placeholder="password"
              autoCompleteType="password"
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

        <Button w={'50%'} onPress={handleSubmit(onSubmit)}>
          Login
        </Button>
        <Pressable onPress={() => nav.navigate('Register')}>
          <Text underline fontSize={'lg'}>
            Register
          </Text>
        </Pressable>
      </VStack>
    </View>
  );
}
