import { Column, Image, Pressable, Row, Text } from 'native-base';
import moment from 'moment';

import { Fixture } from '../../../types';

export default function Matchup({ fixture }: { fixture: Fixture }) {
  return (
    <Pressable onPress={() => console.log(fixture.id)}>
      <Row
        bg="dark.50"
        _light={{ bg: 'light.50' }}
        justifyContent={'space-between'}
        alignItems={'center'}
        p={4}
        mx={2}
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
        <Column alignItems={'center'}>
          <Text textAlign={'center'}>{moment(fixture.datetime).calendar({ sameElse: 'YYYY-MM-DD [\n] h:mm' })}</Text>
        </Column>
      </Row>
    </Pressable>
  );
}
