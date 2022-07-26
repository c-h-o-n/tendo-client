import { CourtStackScreenProps } from '@court/navigation/types';
import { Button, Column, Row, Select, View } from 'native-base';
import { useEffect, useState } from 'react';
import useMatchApi from '@court/hooks/useMatchApi';
import { AxiosError, AxiosResponse } from 'axios';
import { Team } from '../types';
import { useTeamApi } from '@team/hooks/useTeamApi';
import { useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default function CreateMatchScreen({ navigation, route }: CourtStackScreenProps<'CreateMatch'>) {
  const { userId } = useSelector((state: any) => state.userReducer);

  const [date, setDate] = useState<Date>(new Date('2022-05-05'));
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

  const onChallenge = () => {
    createMatch({ datetime: date, teamAId: teamA, teamBId: route.params.teamB.id })
      .then(() => navigation.goBack())
      .catch((error: AxiosError) => console.log(error));
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <Row justifyContent={'center'}>
        <Column w={'75%'} alignItems={'center'} space={5}>
          <Select
            w={'full'}
            selectedValue={teamA}
            onValueChange={(itemValue) => setTeamA(itemValue)}
            placeholder="Choose team"
          >
            {usersTeam &&
              usersTeam.map((team) => <Select.Item key={team.id} label={`${team.location} ${team.name}`} value={team.id} />)}
          </Select>
          <Button variant="outline" _text={{ textAlign: 'center' }} onPress={showDatePicker}>
            {moment(date).calendar({ sameElse: 'YYYY-MM-DD [\n] h:mm' })}
          </Button>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Button onPress={onChallenge}>Challenge</Button>
        </Column>
      </Row>
    </View>
  );
}
