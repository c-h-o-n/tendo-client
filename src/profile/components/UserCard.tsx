import { Center, Column, Image, Row, Text } from 'native-base';
import { User } from '../../types';

export default function UserCard({ user }: { user: User }) {
  return (
    <Column p={'4'} w="75%" borderRadius="md" shadow={'4'} bg="background.dark">
      {/* TODO Make uri relative somehow */}
      <Center w="100%">
        <Image
          alt="player's avatar"
          source={{
            uri: user.avatarUri ? user.avatarUri : '/Users/chon/Desktop/tendo-client/src/common/assets/images/icon.png',
          }}
          w={200}
          h="200"
          borderRadius="md"
        />

        <Row w={'100%'} justifyContent={'space-between'}>
          <Text color={'green.700'}>W: {user.wins}</Text>
          <Text color={'red.700'}>L: {user.loses}</Text>
          <Text color={'primary.500'}>MVP: {!user.mvps && 0}</Text>
        </Row>

        <Text>
          {user.firstName} {user.lastName}
        </Text>
        <Text>{user.location}</Text>
      </Center>
      <Text>Games: {user.games}</Text>
      <Text>Age: {user.age}</Text>
      <Text>Height: {user.height}</Text>
      <Text>Weight: {user.weight}</Text>
    </Column>
  );
}
