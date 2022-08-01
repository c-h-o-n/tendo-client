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

  const [matchup, setMatchup] = useState<Matchup>();
  const [modalVisible, setModalVisible] = useState(false);

  const { getMatch, updateMatch } = useMatchApi();
  const { control, handleSubmit } = useForm();

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

  const isCaptainInTeamA = () => {
    return matchup?.teamA.members.some((member) => member.role === 'captain' && member.id === userId);
  };

  const isCaptainInTeamB = () => {
    return matchup?.teamB.members.some((member) => member.role === 'captain' && member.id === userId);
  };

  const onCompleteMatch = ({ score }: { score: string }) => {
    if (matchup) {
      updateMatch(matchup?.id, {
        ...(isCaptainInTeamA() && { teamAScore: parseInt(score) }),
        ...(isCaptainInTeamB() && { teamBScore: parseInt(score) }),
      })
        .then(() => navigation.navigate('Court'))
        .catch((error: AxiosError) => console.log(error));
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

          {(isCaptainInTeamA() || isCaptainInTeamB()) && (
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
          {isCaptainInTeamA() && <Modal.Header>{`${matchup?.teamA.location}  ${matchup?.teamA.name}`}</Modal.Header>}
          {isCaptainInTeamB() && <Modal.Header>{`${matchup?.teamB.location}  ${matchup?.teamB.name}`}</Modal.Header>}
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
