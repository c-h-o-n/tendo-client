import axios, { AxiosError, AxiosResponse } from 'axios';
import { View, Input, VStack, Button } from 'native-base';
import { Controller, useForm } from 'react-hook-form';

export default function RegisterScreen() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const user = {
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: parseInt(data.age),
      location: data.location,
    };
    axios
      .post('auth/register', user)
      .then((response: AxiosResponse) => {
        console.log('register success', response);
      })
      .catch((error: AxiosError) => {
        console.log('register error', error.message);
      });
  };

  return (
    <View flex={1} justifyContent={'center'} alignItems={'center'}>
      <VStack
        w={{
          base: '75%',
          md: '25%',
        }}
        space={12}
        alignItems={'center'}
      >
        {/* Username */}
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <Input w="100%" placeholder="username" value={value} onChangeText={(value) => onChange(value)} />
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
            <Input w="100%" type="password" placeholder="password" value={value} onChangeText={(value) => onChange(value)} />
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
              w="100%"
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
              w="100%"
              placeholder="firt name"
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
              w="100%"
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
            <Input w="100%" type="email" placeholder="email" value={value} onChangeText={(value) => onChange(value)} />
          )}
          rules={{
            required: {
              value: true,
              message: 'Field is required!',
            },
          }}
        />
        {/* Age */}
        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, value } }) => (
            <Input w="100%" type="number" placeholder="age" value={value} onChangeText={(value) => onChange(value)} />
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
            <Input w="100%" placeholder="location" value={value} onChangeText={(value) => onChange(value)} />
          )}
          rules={{
            required: {
              value: true,
              message: 'Field is required!',
            },
          }}
        />
        <Button w={'50%'} onPress={handleSubmit(onSubmit)}>
          Register
        </Button>
      </VStack>
    </View>
  );
}
