import { MeatballsMenu } from './../../common/components/MeatballsMenu';
// components
import { View, Box, Menu, Toast } from 'native-base';
import { Swiper } from '@common/theme';
import LoadingSpinner from '@common/components/LoadingSpinner';
import NoTeam from './components/NoTeam';
import TeamDetails from '@team/components/TeamDetails';

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
      setTeams([]);
    };
  }, []);

  return (
    <View>
      {loading ? (
        <LoadingSpinner />
      ) : teams.length ? (
        <Box flex={1}>
          <MeatballsMenu>
            <Menu.Item onPress={() => navigation.navigate('CreateTeam')}>Create team</Menu.Item>
            <Menu.Item onPress={() => Toast.show({ description: 'leave team' })}>Leave team</Menu.Item>
          </MeatballsMenu>
          {/* BUG on android animation bug  */}
          <Swiper>
            {teams.map((team) => (
              <TeamDetails key={team.id} team={team} />
            ))}
          </Swiper>
        </Box>
      ) : (
        <NoTeam navigate={() => navigation.navigate('CreateTeam')} />
      )}
    </View>
  );
}
