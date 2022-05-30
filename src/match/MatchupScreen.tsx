import { useEffect, useState } from 'react';
import { Button, Center, Column, Image, Row, Text, View } from 'native-base';
import useMatchApi from '@court/hooks/useMatchApi';
import { CourtStackScreenProps } from '@court/navigation/types';
import { AxiosError, AxiosResponse } from 'axios';
import { Matchup } from '../types';
import TeamMemberCard from '@common/components/TeamMemberCard';
import moment from 'moment';
import { useSelector } from 'react-redux';

// TODO finish me up
export default function MatchupScreen({ route }: CourtStackScreenProps<'Matchup'>) {
  const { userId } = useSelector((state: any) => state.userReducer);

  const { getMatch, updateMatch } = useMatchApi();

  const [matchup, setMatchup] = useState<Matchup>();

  useEffect(() => {
    console.log('Welcome to matchup screen!', route);
    getMatch(route.params.id)
      .then((response: AxiosResponse) => {
        setMatchup(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, []);

  const isCaptian = () => {
    if (matchup) {
      const isCaptainInteamA = matchup.teamA.members.some((member) => member.role === 'captain' && member.id === userId);
      const isCaptainInteamB = matchup.teamB.members.some((member) => member.role === 'captain' && member.id === userId);
      return isCaptainInteamA || isCaptainInteamB;
    }
    return false;
  };

  const onCompleteMatch = () => {
    updateMatch(route.params.id, { status: 'completed' })
      .then((response: AxiosResponse) => {
        console.log(response.data);
      })
      .catch((error: AxiosError) => console.log(error));
  };
  return (
    <View>
      {matchup && matchup.status !== 'completed' && (
        <Column space={3}>
          <Row p={5} justifyContent={'space-between'}>
            <Column alignItems={'center'}>
              <Image
                alt="team logo"
                source={matchup.teamA.logoUrl ? { uri: matchup.teamA.logoUrl } : require('@common/assets/images/icon.png')}
                size="lg"
              />
              <Text>{matchup.teamA.location}</Text>
              <Text>{matchup.teamA.name}</Text>
            </Column>

            <Column justifyContent={'center'} px={2} flex={1}>
              <Text textAlign={'center'}>{moment(matchup.datetime).calendar({ sameElse: 'YYYY-MM-DD [\n] h:mm' })}</Text>
            </Column>

            <Column alignItems={'center'}>
              <Image
                alt="team logo"
                source={matchup.teamB.logoUrl ? { uri: matchup.teamB.logoUrl } : require('@common/assets/images/icon.png')}
                size="lg"
              />
              <Text>{matchup.teamB.location}</Text>
              <Text>{matchup.teamB.name}</Text>
            </Column>
          </Row>

          {isCaptian() && (
            <Row justifyContent={'center'}>
              <Button onPress={onCompleteMatch}>Complete match</Button>
            </Row>
          )}

          <Row space={2} px={2}>
            <Column flex={1}>
              {matchup.teamA.members.map((member) => (
                <TeamMemberCard key={member.id} member={member} showMvp={false} />
              ))}
            </Column>

            <Column flex={1}>
              {matchup.teamB.members.map((member) => (
                <TeamMemberCard key={member.id} member={member} showMvp={false} />
              ))}
            </Column>
          </Row>
        </Column>
      )}

      {matchup && matchup.status === 'completed' && (
        <Center flex={1}>
          <Text>Match is Completed!</Text>
        </Center>
      )}
    </View>
  );
}
