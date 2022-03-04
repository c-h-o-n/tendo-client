import { Center, Column, Image, Row, Text } from 'native-base';
import { User } from '../../types';

export default function UserCard({ user }: { user: User }) {
  return (
    <Column
      p={'4'}
      w="75%"
      borderRadius="md"
      shadow={'4'}
      _dark={{ bg: 'background.dark' }}
      _light={{ bg: 'background.light' }}
    >
      {/* TODO Make default uri relative somehow */}
      <Center w="full">
        <Image
          alt="player's avatar"
          source={{ uri: user.avatarUrl || '/Users/chon/Desktop/tendo-client/src/common/assets/images/icon.png' }}
          w={200}
          h="200"
          borderRadius="md"
        />

        <Row w={'full'} justifyContent={'space-between'}>
          <Text color={'green.700'} bold>
            W: {user.wins}
          </Text>
          <Text color={'red.700'} bold>
            L: {user.loses}
          </Text>
          <Text color={'primary.500'} bold>
            MVP: {user.mvps}
          </Text>
        </Row>

        <Text>
          {user.firstName} {user.lastName}
        </Text>
        <Text>{user.location}</Text>
      </Center>
      <Text>Games: {user.games}</Text>
      <Text>Age: {user.age}</Text>
      <Text>Height: {user.height || '-'}</Text>
      <Text>Weight: {user.weight || '-'}</Text>
    </Column>
  );
}
