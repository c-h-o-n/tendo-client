import { AxiosError, AxiosResponse } from 'axios';
import { Column, Row, Text } from 'native-base';
// hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useMatchApi from '../hooks/useMatchApi';

// types
import { Fixture } from '../../../types';
import Matchup from './Matchup';

export default function UpcomingFixtures() {
  const { getUpcomingFixtures } = useMatchApi();
  const { userId } = useSelector((state: any) => state.userReducer);

  const [fixtures, setFixtures] = useState<Fixture[]>();
  useEffect(() => {
    getUpcomingFixtures(userId)
      .then((response: AxiosResponse) => {
        setFixtures(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  return (
    <Column space={3} pb={1} borderColor={'primary.500'} borderWidth={2} borderRadius={'lg'} w={'full'}>
      <Row bg={'primary.500'} p={2}>
        <Text>Upcoming Fixtures</Text>
      </Row>
      {fixtures && fixtures.map((fixture) => <Matchup key={fixture.id} fixture={fixture} />)}
    </Column>
  );
}
