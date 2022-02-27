import { Center, Column, FlatList, Image, Text } from 'native-base';
import { Team, User } from '../../../types';

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Column mt={5} p={'4'} w="75%" borderRadius="md" shadow={'4'} bg="background.dark">
      <Center w={'100%'}>
        <Text>{team.location}</Text>
        <Text>{team.name}</Text>
        <Image
          alt="player's avatar"
          source={{
            uri: team.logoUrl ? team.logoUrl : '/Users/chon/Desktop/tendo-client/src/common/assets/images/icon.png',
          }}
          w={200}
          h="200"
          borderRadius="md"
        />
        <Text bold>
          <Text color={'green.700'}>W: {team.wins}</Text>
          <Text color={'red.700'}>L: {team.loses}</Text>
          <Text color={'primary.500'}>G: {team.wins + team.loses}</Text>
        </Text>
        {/* TODO add elo icons */}
        <Text>{!team.elo ? '0' : team.elo}</Text>
        <FlatList
          data={team.members}
          renderItem={({ item }) => <Text>{item.username}</Text>}
          keyExtractor={(item: User) => item.id}
        />
      </Center>
    </Column>
  );
}
