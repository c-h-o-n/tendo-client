import { Box, Image, Row, Text } from 'native-base';
import { User } from '../../../types';

export default function TeamMembersList({ members }: { members: (User & { role: 'captain' | 'member' })[] }) {
  return (
    <Box w={'full'} px={5}>
      {members.map((item) => (
        <Row key={item.id} justifyContent={'space-between'} alignItems={'center'} borderRadius="md" p={2} mb={3}>
          <Image
            alt="player's avatar"
            source={{
              uri: item.avatarUrl || '/Users/chon/Desktop/tendo-client/src/common/assets/images/icon.png',
            }}
            w={10}
            h={10}
            borderRadius="md"
          />
          <Text>
            {item.firstName} {item.lastName}
          </Text>
          <Text color={'primary.500'}>MVP: {item.mvps}</Text>
          <Text position={'absolute'} right={0}>
            {item.role === 'captain' && '*'}
          </Text>
        </Row>
      ))}
    </Box>

    // ERROR Nested virtualized list
    // <FlatList
    //   w={'full'}
    //   px={5}
    //   data={members}
    //   renderItem={({ item }) => (
    //     <Row justifyContent={'space-between'} alignItems={'center'} borderRadius="md" p={2} mb={3}>
    //       <Image
    //         alt="player's avatar"
    //         source={{
    //           uri: item.avatarUrl || '/Users/chon/Desktop/tendo-client/src/common/assets/images/icon.png',
    //         }}
    //         w={10}
    //         h={10}
    //         borderRadius="md"
    //       />
    //       <Text>
    //         {item.firstName} {item.lastName}
    //       </Text>
    //       <Text color={'primary.500'}>MVP: {item.mvps}</Text>
    //       <Text position={'absolute'} right={0}>
    //         {item.role === 'captain' && '*'}
    //       </Text>
    //     </Row>
    //   )}
    //   keyExtractor={(item: User) => item.id}
    // />
  );
}
