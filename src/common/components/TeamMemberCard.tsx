import { Image, Row, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { User } from '../../types';
export default function TeamMemberCard({
  member,
  showMvp = true,
}: {
  member: User & { role: 'captain' | 'member' };
  showMvp?: boolean;
}) {
  const { userId } = useSelector((state: any) => state.userReducer);

  return (
    <Row
      bg={userId === member.id ? 'primary.500' : 'transparent'}
      justifyContent={'space-between'}
      alignItems={'center'}
      borderRadius="md"
      p={2}
      mb={3}
    >
      <Image
        alt="player's avatar"
        source={member.avatarUrl ? { uri: member.avatarUrl } : require('@common/assets/images/icon.png')}
        size={'xs'}
        borderRadius="md"
      />

      <Text>
        {member.firstName} {member.lastName}
      </Text>

      {showMvp && <Text color={'primary.300'}>MVP: {member.mvps}</Text>}

      <Text>{member.role === 'captain' && '*'}</Text>
    </Row>
  );
}
