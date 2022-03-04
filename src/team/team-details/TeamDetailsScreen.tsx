import { MeatballsMenu } from '@common/components/MeatballsMenu';
import { CourtStackScreenProps } from '@court/navigation/types';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTeamApi } from '@team/hooks/useTeamApi';
import { AxiosError, AxiosResponse } from 'axios';
import { Icon, IconButton, Menu, View } from 'native-base';
import { useEffect, useState } from 'react';
import { Team } from '../../types';
import TeamDetails from '../components/TeamDetails';

export default function TeamDetailsScreen({ route, navigation }: CourtStackScreenProps<'TeamDetails'>) {
  const { getTeam } = useTeamApi();

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

  return (
    <View>
      <IconButton
        position={'absolute'}
        zIndex={1}
        icon={<Icon as={FontAwesome5} name={'arrow-left'} />}
        onPress={() => navigation.goBack()}
      ></IconButton>
      <MeatballsMenu>
        {/* TODO implement joining team */}
        <Menu.Item>Join team</Menu.Item>
      </MeatballsMenu>
      {team && <TeamDetails team={team} />}
    </View>
  );
}
