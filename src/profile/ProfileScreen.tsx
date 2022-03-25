// hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUserApi } from './hooks/useUserApi';

// types
import { User } from '../types';
import { AxiosError, AxiosResponse } from 'axios';

// components
import { Box, HamburgerIcon, Menu, View } from 'native-base';
import UserCard from './components/UserCard';
import LoadingSpinner from '@common/components/LoadingSpinner';
import { Pressable } from 'react-native';

export default function ProfileScreen() {
  const { getUserByUsername } = useUserApi();

  const { username } = useSelector((state: any) => state.userReducer);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUserByUsername(username)
      .then((response: AxiosResponse<User>) => {
        console.log('get user: ', response.data.username);
        setUser(response.data);
      })
      .catch((error: AxiosError) => {
        console.log('error on prof', error);
      });

    return () => {
      setUser(undefined);
    };
  }, []);

  return (
    <View alignItems={'center'}>
      {!user ? (
        <LoadingSpinner />
      ) : (
        <Box>
          <Menu
            trigger={(triggerProps) => {
              return (
                <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                  <HamburgerIcon />
                </Pressable>
              );
            }}
          >
            <Menu.Item>Arial</Menu.Item>
            <Menu.Item>Nunito Sans</Menu.Item>
            <Menu.Item>Roboto</Menu.Item>
            <Menu.Item>Poppins</Menu.Item>
            <Menu.Item>SF Pro</Menu.Item>
            <Menu.Item>Helvetica</Menu.Item>
            <Menu.Item isDisabled>Sofia</Menu.Item>
            <Menu.Item>Cookie</Menu.Item>
          </Menu>
          <UserCard user={user} />
        </Box>
      )}
    </View>
  );
}
