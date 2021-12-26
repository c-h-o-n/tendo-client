import { Box, Button, Heading, Input, VStack, Pressable, Text, useToast } from 'native-base';
import { View, Text as T } from 'react-native';

export default function LoginScreen() {
  const toast = useToast();
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <VStack
        w={{
          base: '75%',
          md: '25%',
        }}
        space={12}
        alignItems={'center'}
      >
        <Input w="100%" size="lg" variant={'underlined'} placeholder="username" />
        <Input w="100%" size="lg" variant={'underlined'} type="password" placeholder="password" />
        <Button w={'50%'}>Login</Button>
        <Pressable onPress={() => toast.show({ description: 'Navigate to Registration Page' })}>
          <Text underline fontSize={'lg'}>
            Register
          </Text>
        </Pressable>
      </VStack>
    </Box>
  );
}
