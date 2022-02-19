import { View, Text, Column, Spinner } from 'native-base';

// hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUserApi } from './hooks/useUserApi';

// types
import { User } from '../types';
import { AxiosError, AxiosResponse } from 'axios';

export default function ProfileScreen() {
  const { username } = useSelector((state: any) => state.userReducer);

  const [user, setUser] = useState<User | undefined>();

  const { getUserByUsername } = useUserApi();

  useEffect(() => {
    getUserByUsername(username)
      .then((response: AxiosResponse) => {
        console.log('get user: ', response.status);
        setUser(response.data);
      })
      .catch((error: AxiosError) => {
        console.log('error on prof', error);
      });
    return () => {
      setUser(undefined);
    };
  }, []);

  if (!user) {
    return (
      <View justifyContent={'center'} alignItems={'center'}>
        <Spinner></Spinner>
      </View>
    );
  }
  // TODO load image
  return (
    <View justifyContent={'flex-start'} alignItems={'center'}>
      <Column height={200} alignItems={'center'} justifyContent={'space-between'}>
        <Text>TODO load image</Text>

        <Text bold>
          <Text color={'green.700'}>W: {user.wins}</Text>
          <Text color={'red.700'}>L: {user.loses}</Text>
          <Text color={'primary.500'}>MVP: {user.mvps}</Text>
        </Text>

        <Text>
          {user.firstName} {user.lastName}
        </Text>
        <Text>{user.location}</Text>
        <Text>Games: {user.games}</Text>
        <Text>Match history: </Text>
        <Text>Age: {user.age}</Text>
        <Text>Height: {user.height}</Text>
        <Text>Weight: {user.weight}</Text>
        <Text>Sports: {user.sports}</Text>
        <Text>Joined: {user.joiningDate}</Text>
      </Column>
    </View>
  );
}
