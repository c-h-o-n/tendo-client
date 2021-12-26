import { Box, View } from 'native-base';

export default function SafeAreaView(props: any) {
  return (
    <Box flex={1} safeAreaTop _light={{ bg: 'background.light' }} _dark={{ bg: 'background.dark' }} {...props}>
      <View {...props}></View>
    </Box>
  );
}
