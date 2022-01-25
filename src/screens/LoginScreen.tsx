import { View, Button, Heading, Input, VStack, Pressable, Text, useToast, Image } from 'native-base';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setAccessToken, setRefreshToken } from '../redux/actions';
import * as SecureStore from 'expo-secure-store';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

export default function LoginScreen() {
  const toast = useToast();

  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state: any) => state.userReducer);

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
        console.log('login');
      })
      .catch((error: AxiosError) => {
        console.log('login error', error.response?.data.message);
      });
  };

  return (
    <View justifyContent={'center'} alignItems={'center'}>
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
            <Input
              w="100%"
              size="lg"
              variant={'underlined'}
              placeholder="username"
              autoCapitalize="none"
              value={value}
              onChangeText={value => onChange(value)}
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
              w="100%"
              size="lg"
              variant={'underlined'}
              type="password"
              placeholder="password"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={value => onChange(value)}
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
        <Pressable onPress={() => toast.show({ description: 'Navigate to Registration Page' })}>
          <Text underline fontSize={'lg'}>
            Register
          </Text>
        </Pressable>
      </VStack>
    </View>
  );
}
