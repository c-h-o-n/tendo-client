// components
import { View, Menu, Pressable, HamburgerIcon, Box, Toast, Center } from 'native-base';
import { Swiper } from '@common/theme';
import LoadingSpinner from '@common/components/LoadingSpinner';
import TeamCard from './components/TeamCard';
import NoTeam from './components/NoTeam';

// hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTeamApi } from '@team/hooks/useTeamApi';

// types
import { AxiosError, AxiosResponse } from 'axios';
import { Team } from '../../types';
import { TeamStackScreenProps } from '@team/navigation/types';

export default function TeamListScreen({ navigation }: TeamStackScreenProps<'TeamList'>) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);

  const { userId } = useSelector((state: any) => state.userReducer);

  const { getTeamsByUserId } = useTeamApi();

  useEffect(() => {
    setLoading(true);
    getTeamsByUserId(userId)
      .then((response: AxiosResponse) => {
        console.log('teams loaded');
        setTeams(response.data);
      })
      .catch((error: AxiosError) => {
        console.log('rejected', error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      () => console.log('cleanup');
    };
  }, []);

  return (
    <View>
      {loading ? (
        <LoadingSpinner />
      ) : teams.length ? (
        <Box flex={1}>
          <Menu
            trigger={(triggerProps) => {
              return (
                <Pressable position="absolute" right={0} mr={2} zIndex={1} {...triggerProps}>
                  <HamburgerIcon />
                </Pressable>
              );
            }}
          >
            <Menu.Item onPress={() => navigation.navigate('CreateTeam')}>Create team</Menu.Item>
            <Menu.Item onPress={() => Toast.show({ description: 'leave team' })}>Leave team</Menu.Item>
          </Menu>
          {/* BUG on android animation bug */}
          <Swiper>
            {teams.map((team) => (
              <Center key={team.id}>
                <TeamCard team={team} />
              </Center>
            ))}
          </Swiper>
        </Box>
      ) : (
        <NoTeam navigation={navigation} />
      )}
    </View>
  );
}
