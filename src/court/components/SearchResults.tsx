import { CourtStackParamList } from '@court/navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Center, Pressable, Text } from 'native-base';

export default function SearchResults({ results }: any) {
  const navigation = useNavigation<NavigationProp<CourtStackParamList>>();

  const navigateToTeam = (team: any) => {
    navigation.navigate('TeamDetails', { id: team.id });
  };
  return (
    <>
      <Center mt={5}>
        <Text>Teams</Text>
      </Center>
      {results &&
        results.teams.map((team: any) => (
          <Pressable key={team.id} onPress={() => navigateToTeam(team)}>
            <Text>
              {team.location} {team.name}
            </Text>
          </Pressable>
        ))}
    </>
  );
}
