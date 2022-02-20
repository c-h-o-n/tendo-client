import { FontAwesome5 } from '@expo/vector-icons';
import { Icon, IconButton, Input, View, Row, Heading } from 'native-base';

import { CourtStackScreenProps } from '@court/navigation/types';
import { Emoji } from '@common/theme';

export default function CourtScreen({ navigation }: CourtStackScreenProps<'Court'>) {
  const navigateToChat = () => {
    navigation.navigate('Chat');
  };

  return (
    <View>
      <Row space={2} ml={2} justifyContent={'space-between'}>
        <Input flex={1} InputLeftElement={<Emoji name="mag" />} placeholder="search..." />
        <IconButton icon={<Icon as={FontAwesome5} name="comment-dots" />} onPress={navigateToChat} />
      </Row>
      <Row justifyContent={'center'} alignItems={'center'} flex={1}>
        <Heading>Posts</Heading>
      </Row>
    </View>
  );
}
