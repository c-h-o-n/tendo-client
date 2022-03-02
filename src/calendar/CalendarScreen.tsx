import axios, { AxiosError, AxiosResponse } from 'axios';
import { View, Button, useColorMode, Text, Image, Column } from 'native-base';
import { useDispatch } from 'react-redux';

import * as SecureStore from 'expo-secure-store';
import { setAccessToken, setRefreshToken } from '../redux/actions';

import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function CalendarScreen() {
  const { colorMode, toggleColorMode } = useColorMode();

  const dispatch = useDispatch();
  // BUG after navigating back from chat on checkNetwork() and color mode change the app renavigate to court
  const checkNetwork = () => {
    console.log('get protected route');
    axios
      .get('/')
      .then((response: AxiosResponse) => {
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log("can't react protect route", error.message);
      });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    dispatch(setAccessToken(null));
    await SecureStore.deleteItemAsync('refreshToken');
    dispatch(setRefreshToken(null));
    console.log('deleted');
  };

  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View justifyContent={'flex-start'} alignItems={'center'}>
      <Column space={5}>
        <Button onPress={toggleColorMode}>{`Current mode ${colorMode?.toString()}`}</Button>
        <Button onPress={checkNetwork}>Check token</Button>
        <Button onPress={logout}>Logout</Button>
        <Button onPress={pickImage}>Browse Images</Button>
        {image ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> : <Text>No image</Text>}
      </Column>
    </View>
  );
}
