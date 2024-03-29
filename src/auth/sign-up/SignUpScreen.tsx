import { Controller, useForm } from 'react-hook-form';

// theme
import { View, Input, Column, Button } from 'native-base';
import { Emoji } from '../../common/theme';

// hooks
import { useAuthApi } from '../hooks/useAuthApi';

// types
import { AuthStackScreenProps } from '../navigation/types';
import { AxiosError, AxiosResponse } from 'axios';

export default function SignUpScreen({ navigation }: AuthStackScreenProps<'SignUp'>) {
  const { control, handleSubmit } = useForm();
  const { signUp } = useAuthApi();

  const onSubmit = (data: any) => {
    const user = {
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDate: data.birthDate,
      location: data.location,
    };

    signUp(user)
      .then((response: AxiosResponse) => {
        console.log('sign up success', response.status);
        navigation.navigate('SignIn');
      })
      .catch((error: AxiosError) => {
        console.log('sign up error', error.response);
      });
  };

  return (
    <View flex={1} alignItems={'center'}>
      <Column w={'75%'} space={5} mt={10} alignItems={'center'}>
        {/* Username */}
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
        {/* Password */}
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
        {/* Confirm Password */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              InputLeftElement={<Emoji name="repeat" />}
              type="password"
              placeholder="confirm password"
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
        {/* First name */}
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <Input
              InputLeftElement={<Emoji name="monkey" />}
              placeholder="first name"
              autoCapitalize="words"
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
        {/* Last name */}
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <Input
              InputLeftElement={<Emoji name="ghost" />}
              placeholder="last name"
              autoCapitalize="words"
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
        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              InputLeftElement={<Emoji name="envelope" />}
              type="email"
              placeholder="email"
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
        {/* Date of birth */}
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value } }) => (
            <Input
              InputLeftElement={<Emoji name="hatching_chick" />}
              type="datapicker"
              placeholder="date of birth"
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
        {/* Email */}
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <Input
              InputLeftElement={<Emoji name="pushpin" />}
              placeholder="location"
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
        <Button onPress={handleSubmit(onSubmit)}>Sign up!</Button>
      </Column>
    </View>
  );
}
