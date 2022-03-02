import { Center, Column, FlatList, Image, Row, Text } from 'native-base';
import { Team, User } from '../../../types';
// FIXME style cards
export default function TeamCard({ team }: { team: Team }) {
  return (
    <Column space={2} mt={5} p={'4'} w="75%" borderRadius="md" shadow={'4'} bg="background.dark">
      <Center w={'full'}>
        <Text>{team.location}</Text>
        <Text>{team.name}</Text>
        <Image
          alt="team logo"
          source={{ uri: team.logoUrl || '/Users/chon/Desktop/tendo-client/src/common/assets/images/icon.png' }}
          w={200}
          h="200"
          borderRadius="md"
        />
        <Row w={'full'} justifyContent={'space-between'}>
          <Text color={'green.700'}>W: {team.wins}</Text>
          <Text color={'red.700'}>L: {team.loses}</Text>
          <Text color={'primary.500'}>G: {team.wins + team.loses}</Text>
        </Row>
        {/* LATER add elo icons */}
      </Center>
      <Text>Elo: {!team.elo ? '0' : team.elo}</Text>
    </Column>
  );
}
