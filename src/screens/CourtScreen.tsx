import { FontAwesome5 } from '@expo/vector-icons';
import { Icon, IconButton, Input, View, Row, Flex, Container, Heading } from 'native-base';
import { HomeStackScreenProps } from '../navigation/types';
import { Emoji } from '../theme';

export default function CourtScreen({ navigation }: HomeStackScreenProps<'Court'>) {
  const navigateToChat = () => {
    navigation.navigate('Chat');
  };
  return (
    <View>
      <Row space={2} mx={2} justifyContent={'space-between'}>
        <Input flex={1} InputLeftElement={<Emoji name="mag" />} placeholder="search..." />
        <IconButton icon={<Icon as={FontAwesome5} name="comment-dots" />} onPress={navigateToChat} />
      </Row>
      <Row justifyContent={'center'} alignItems={'center'} flex={1}>
        <Heading>Posts</Heading>
      </Row>
    </View>
  );
}
