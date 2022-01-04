import { Box, Button, Heading, Input, VStack, Pressable, Text, useToast, Image } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { View, Text as T } from 'react-native';

export default function LoginScreen() {
  const toast = useToast();

  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
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
    </Box>
  );
}
