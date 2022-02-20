import { Column, Image, Text } from 'native-base';
import { User } from '../../types';

export default function UserCard({ user }: { user: User }) {
  return (
    <Column height={200} alignItems={'center'} justifyContent={'space-between'}>
      {/* TODO load image */}
      <Image alt="placer's image" />

      <Text bold>
        <Text color={'green.700'}>W: {user.wins}</Text>
        <Text color={'red.700'}>L: {user.loses}</Text>
        <Text color={'primary.500'}>MVP: {user.mvps}</Text>
      </Text>

      <Text>
        {user.firstName} {user.lastName}
      </Text>
      <Text>{user.location}</Text>
      <Text>Games: {user.games}</Text>
      <Text>Match history: </Text>
      <Text>Age: {user.age}</Text>
      <Text>Height: {user.height}</Text>
      <Text>Weight: {user.weight}</Text>
      <Text>Sports: {user.sports}</Text>
      <Text>Joined: {user.joiningDate}</Text>
    </Column>
  );
}
