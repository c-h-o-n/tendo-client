import { AxiosError, AxiosResponse } from 'axios';
import { Column, Image, Pressable, Row, Text } from 'native-base';
// hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useMatchApi from '../hooks/useMatchApi';

// types
import { Fixture } from '../../../types';

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
    <Column space={3} p={3} borderRadius={'lg'} w={'full'}>
      <Row>
        <Text>Next Fixtures</Text>
      </Row>
      {fixtures &&
        fixtures.map((fixture) => (
          <Pressable key={fixture.id} onPress={() => console.log(fixture.id)}>
            <Row
              bg="dark.50"
              _light={{ bg: 'light.50' }}
              justifyContent={'space-between'}
              alignItems={'center'}
              p={2}
              borderRadius={'md'}
            >
              <Column space={1}>
                <Row space={1}>
                  <Image alt="team logo" source={require('@common/assets/images/icon.png')} size="2xs" />
                  <Text>{fixture.teamA.name}</Text>
                </Row>
                <Row space={1}>
                  <Image alt="team logo" source={require('@common/assets/images/icon.png')} size="2xs" />
                  <Text>{fixture.teamB.name}</Text>
                </Row>
              </Column>
              <Text>{fixture.datetime.substring(0, fixture.datetime.indexOf('T'))}</Text>
            </Row>
          </Pressable>
        ))}
    </Column>
  );
}
