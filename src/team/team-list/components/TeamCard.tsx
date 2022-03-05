import { Center, Column, Image, Row, Text } from 'native-base';
import { Team } from '../../../types';
// FIXME style cards
export default function TeamCard({ team }: { team: Team }) {
  return (
    <Column
      space={2}
      p={4}
      w="75%"
      borderRadius="md"
      shadow={'4'}
      _dark={{ bg: 'background.dark' }}
      _light={{ bg: 'background.light' }}
    >
      <Center w={'full'}>
        <Text>{team.location}</Text>
        <Text>{team.name}</Text>
        <Image
          w={200}
          h="200"
          borderRadius="md"
          alt="team logo"
          source={team.logoUrl ? { uri: team.logoUrl } : require('@common/assets/images/icon.png')}
        />
        <Row w={'full'} justifyContent={'space-between'}>
          <Text color={'green.700'} bold>
            W: {team.wins}
          </Text>
          <Text color={'red.700'} bold>
            L: {team.loses}
          </Text>
          <Text color={'primary.500'} bold>
            G: {team.wins + team.loses}
          </Text>
        </Row>
        {/* LATER add elo icons */}
      </Center>
      <Text>Elo: {!team.elo ? '0' : team.elo}</Text>
    </Column>
  );
}
