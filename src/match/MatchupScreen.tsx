import { useEffect, useState } from 'react';
import { Button, Center, Column, Image, Input, Modal, Row, Text, View } from 'native-base';
import useMatchApi from '@court/hooks/useMatchApi';
import { CourtStackScreenProps } from '@court/navigation/types';
import { AxiosError, AxiosResponse } from 'axios';
import { Matchup, Team } from '../types';
import TeamMemberCard from '@common/components/TeamMemberCard';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Emoji } from '@common/theme';
import { Controller, useForm } from 'react-hook-form';

// TODO finish me up
export default function MatchupScreen({ route, navigation }: CourtStackScreenProps<'Matchup'>) {
  const { userId } = useSelector((state: any) => state.userReducer);
  const { control, handleSubmit } = useForm();

  const { getMatch, updateMatch } = useMatchApi();

  const [matchup, setMatchup] = useState<Matchup>();

  useEffect(() => {
    console.log('Welcome to matchup screen!', route);
    getMatch(route.params.id)
      .then((response: AxiosResponse) => {
        console.log('data', response.data);
        setMatchup(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (matchup) {
      console.log('matchup useffect');
      const isCaptainInteamA = matchup.teamA.members.some((member) => member.role === 'captain' && member.id === userId);
      if (isCaptainInteamA) {
        setCaptainTeam(matchup.teamA);
      }
      const isCaptainInteamB = matchup.teamB.members.some((member) => member.role === 'captain' && member.id === userId);
      if (isCaptainInteamB) {
        setCaptainTeam(matchup.teamB);
      }
    }
  }, [matchup]);

  const [captainTeam, setCaptainTeam] = useState<Team>();

  const isCaptain = () => {
    if (matchup) {
      const isCaptainInteamA = matchup.teamA.members.some((member) => member.role === 'captain' && member.id === userId);
      const isCaptainInteamB = matchup.teamB.members.some((member) => member.role === 'captain' && member.id === userId);
      return isCaptainInteamA || isCaptainInteamB;
    }
    return false;
  };

  const [modalVisible, setModalVisible] = useState(false);

  const onCompleteMatch = ({ score }: { score: string }) => {
    if (matchup) {
      console.log(matchup);
      if (captainTeam?.id === matchup?.teamA.id) {
        updateMatch(matchup?.id, { teamAScore: parseInt(score) })
          .then((resp) => {
            console.log(resp);
          })
          .then((e) => console.log(e));
      } else {
        updateMatch(matchup?.id, { teamBScore: parseInt(score) });
      }
    }
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
              <Text>{matchup.teamAScore}</Text>
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
              <Text>{matchup.teamBScore}</Text>
            </Column>
          </Row>

          {isCaptain() && (
            <Row justifyContent={'center'}>
              <Button onPress={() => setModalVisible(!modalVisible)}>Complete match</Button>
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

      <Modal isOpen={modalVisible} onClose={setModalVisible} size={'md'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{captainTeam && `${captainTeam?.location}  ${captainTeam?.name}`}</Modal.Header>
          <Modal.Body>
            <Controller
              control={control}
              name="score"
              render={({ field: { onChange, value } }) => (
                <Input
                  InputLeftElement={<Emoji name="checkered_flag" />}
                  placeholder={'enter score'}
                  keyboardType={'numeric'}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Field is required!',
                },
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={handleSubmit(onCompleteMatch)}>Save</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}
