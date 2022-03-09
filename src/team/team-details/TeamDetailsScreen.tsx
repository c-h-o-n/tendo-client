import LoadingSpinner from '@common/components/LoadingSpinner';
import { MeatballsMenu } from '@common/components/MeatballsMenu';
import { CourtStackScreenProps } from '@court/navigation/types';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTeamApi } from '@team/hooks/useTeamApi';
import { AxiosError, AxiosResponse } from 'axios';
import { Box, Icon, IconButton, Menu, Text, View } from 'native-base';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Team } from '../../types';
import TeamDetails from '../components/TeamDetails';

export default function TeamDetailsScreen({ route, navigation }: CourtStackScreenProps<'TeamDetails'>) {
  const { getTeam, joinTeam } = useTeamApi();
  const { userId } = useSelector((state: any) => state.userReducer);

  const [team, setTeam] = useState<Team>();

  useEffect(() => {
    getTeam(route.params.id)
      .then((response: AxiosResponse<Team>) => {
        console.log(route.params?.id);
        console.log('fetch team', response.data);
        setTeam(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  const onJoinTeam = () => {
    if (team) {
      joinTeam(team.id)
        .then((response: AxiosResponse) => {
          console.log('successful join', response.status);
        })
        .catch((error: AxiosError) => {
          console.log('error join', error.message);
        });
    }
  };

  return (
    <View>
      {team ? (
        <Box>
          <IconButton
            position={'absolute'}
            zIndex={1}
            icon={<Icon as={FontAwesome5} name={'arrow-left'} />}
            onPress={() => navigation.goBack()}
          ></IconButton>
          <MeatballsMenu>
            {!team.members.some((member) => member.id === userId) && <Menu.Item onPress={onJoinTeam}>Join team</Menu.Item>}
            {/* <Menu.Item onPress={onJoinTeam}>Join team</Menu.Item> */}
          </MeatballsMenu>
          <TeamDetails team={team} />
        </Box>
      ) : (
        <LoadingSpinner />
      )}
    </View>
  );
}
