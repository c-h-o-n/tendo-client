import { Center, Column, ScrollView, Text } from 'native-base';
import UpcomingFixtures from './UpcomingFixtures';

export default function Dashboard() {
  return (
    <ScrollView bounces={false}>
      <Center m={5}>
        <Column w="full" space={5}>
          <UpcomingFixtures />
          {/* <Center>
            <Text>local rankings...</Text>
          </Center> */}
        </Column>
      </Center>
    </ScrollView>
  );
}
