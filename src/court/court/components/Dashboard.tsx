import { Center, Column, ScrollView } from 'native-base';
import UpcomingFixtures from './UpcomingFixtures';

export default function Dashboard() {
  return (
    <ScrollView>
      <Center mt={2} mx={5}>
        <Column w="full">
          <UpcomingFixtures />
        </Column>
      </Center>
    </ScrollView>
  );
}
