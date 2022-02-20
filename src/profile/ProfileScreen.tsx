// hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUserApi } from './hooks/useUserApi';

// types
import { User } from '../types';
import { AxiosError, AxiosResponse } from 'axios';

// components
import { View } from 'native-base';
import UserCard from './components/UserCard';
import LoadingSpinner from '@common/components/LoadingSpinner';

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

  return <View>{!user ? <LoadingSpinner /> : <UserCard user={user} />}</View>;
}
