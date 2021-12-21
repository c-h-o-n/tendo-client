import { Box, Heading } from 'native-base';
import { Text, View } from '../components/Themed';

export default function ProfileScreen() {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'} safeArea>
      <Heading> Profile Works!</Heading>
    </Box>
  );
}
