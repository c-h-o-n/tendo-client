import { useEffect, useState } from 'react';
import { Column, Image, Row, Text, View } from 'native-base';
import useMatchApi from '@court/hooks/useMatchApi';
import { CourtStackScreenProps } from '@court/navigation/types';
import { AxiosError, AxiosResponse } from 'axios';
import { Matchup } from '../types';
import TeamMemberCard from '@common/components/TeamMemberCard';

export default function MatchupScreen({ route }: CourtStackScreenProps<'Matchup'>) {
  const { getMatch } = useMatchApi();

  const [matchup, setMatchup] = useState<Matchup>();

  useEffect(() => {
    getMatch(route.params.id)
      .then((response: AxiosResponse) => {
        setMatchup(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, []);

  return (
    <View>
      {matchup && (
        <Column>
          <Row p={5} justifyContent={'space-between'}>
            <Column alignItems={'center'}>
              <Image alt="team logo" source={matchup.teamA.logoUrl || require('@common/assets/images/icon.png')} size="xl" />
              <Text>{matchup.teamA.location}</Text>
              <Text>{matchup.teamA.name}</Text>
            </Column>

            <Column alignItems={'center'}>
              <Image alt="team logo" source={matchup.teamB.logoUrl || require('@common/assets/images/icon.png')} size="xl" />
              <Text>{matchup.teamB.location}</Text>
              <Text>{matchup.teamB.name}</Text>
            </Column>
          </Row>

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
    </View>
  );
}
