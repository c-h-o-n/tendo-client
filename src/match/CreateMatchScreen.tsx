import { CourtStackScreenProps } from '@court/navigation/types';
import { Button, Column, Row, Select, View } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import useMatchApi from '@court/hooks/useMatchApi';
import { AxiosError, AxiosResponse } from 'axios';
import { Team } from '../types';
import { useTeamApi } from '@team/hooks/useTeamApi';
import { useSelector } from 'react-redux';

export default function CreateMatchScreen({ navigation, route }: CourtStackScreenProps<'CreateMatch'>) {
  const { userId } = useSelector((state: any) => state.userReducer);

  const [date, setDate] = useState<Date>(new Date());
  const [teamA, setTeamA] = useState<string>('');
  const [usersTeam, setUsersTeam] = useState<Team[]>([]);

  const { createMatch } = useMatchApi();
  const { getTeamsByUserId } = useTeamApi();

  useEffect(() => {
    getTeamsByUserId(userId)
      .then((resposne: AxiosResponse) => {
        setUsersTeam(resposne.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .catch();
  }, []);

  const onChange = (event: any, value?: Date) => {
    if (!value) {
      return;
    }

    setDate(value);
  };

  const onChallenge = () => {
    createMatch({ datetime: date, teamAId: teamA, teamBId: route.params.teamB.id })
      .then(() => navigation.goBack())
      .catch((error: AxiosError) => console.log(error));
  };
  return (
    <View>
      <Row justifyContent={'center'}>
        <Column w={'75%'}>
          <Select selectedValue={teamA} onValueChange={(itemValue) => setTeamA(itemValue)} placeholder="Choose team">
            {usersTeam &&
              usersTeam.map((team) => <Select.Item key={team.id} label={`${team.location} ${team.name}`} value={team.id} />)}
          </Select>
          <DateTimePicker display="inline" value={date} mode={'datetime'} onChange={onChange} />
          <Button onPress={onChallenge}>Challenge</Button>
        </Column>
      </Row>
    </View>
  );
}
