import { Spinner, View } from 'native-base';

export default function SplashScreen() {
  return (
    <View justifyContent={'center'} alignItems={'center'}>
      <Spinner />
    </View>
  );
}
