import { Button, Heading, useColorMode, Box, Text, View, StatusBar } from 'native-base';
import { RootTabScreenProps } from '../types';

export default function CourtScreen({ navigation }: RootTabScreenProps<'Court'>) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <View justifyContent={'flex-start'} alignItems={'center'}>
      <Heading>Court Works!!!!</Heading>
      <Button mt={5} onPress={toggleColorMode}>
        {`Current mode ${colorMode?.toString()}`}
      </Button>
      <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} />
    </View>
  );
}
