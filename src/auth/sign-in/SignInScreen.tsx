import { Controller, useForm } from 'react-hook-form';
import { setAccessToken, setRefreshToken, setUserId, setUsername } from '@redux/actions';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';

// theme
import { View, Button, Input, Column, Text, Image, useColorMode, Icon, IconButton } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { Emoji } from '../../common/theme';

// types
import { AuthStackScreenProps } from '../navigation/types';
import { AxiosError, AxiosResponse } from 'axios';

// api calls
import { useAuthApi } from '../hooks/useAuthApi';

export default function SignInScreen({ navigation }: AuthStackScreenProps<'SignIn'>) {
  const { control, handleSubmit } = useForm();
  const { colorMode, toggleColorMode } = useColorMode();
  const { signIn } = useAuthApi();

  const dispatch = useDispatch();

  const onSubmit = ({ username, password }: { username: string; password: string }) => {
    return signIn(username, password)
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
        <Image
          source={{ uri: 'https://wallpaperaccess.com/full/317501.jpg' }}
          alt={'App logo'}
          size={'xl'}
          borderRadius={100}
        />

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
