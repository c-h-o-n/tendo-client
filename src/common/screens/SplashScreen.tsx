import { View } from 'native-base';
import { Text } from 'react-native';

export default function SplashScreen() {
  return (
    <View bg={'purple.300'} justifyContent={'center'} alignItems={'center'}>
      <Text>Loading...</Text>
    </View>
  );
}
