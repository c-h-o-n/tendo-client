import { Box, Heading } from 'native-base';
import { RootTabScreenProps } from '../types';

export default function CourtScreen({ navigation }: RootTabScreenProps<'Court'>) {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'} safeArea>
      <Heading> Court Works!</Heading>
    </Box>
  );
}
