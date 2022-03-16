import { CourtStackScreenProps } from '@court/navigation/types';
import { View, Heading } from 'native-base';

export default function ChatScreen(props: CourtStackScreenProps<'Chat'>) {
  return (
    <View justifyContent={'center'} alignItems={'center'}>
      <Heading>Chat Works!</Heading>
    </View>
  );
}
