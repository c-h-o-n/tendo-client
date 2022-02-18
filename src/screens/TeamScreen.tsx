import axios, { AxiosError, AxiosResponse } from 'axios';
import { View, Heading, Center, Button, Column, FlatList, Text, Spinner, Box, Row } from 'native-base';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TeamStackScreenProps } from '../navigation/types';
import { Swiper } from '../theme';
import { Team, User } from '../types';

export default function TeamScreen({ navigation }: TeamStackScreenProps<'Home'>) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useSelector((state: any) => state.userReducer);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`user/${userId}/teams`)
      .then((response: AxiosResponse) => {
        console.log(response.data);
        setTeams(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        console.log(error.request);
      });
  }, []);

  if (loading) {
    return (
      <View justifyContent={'center'} alignItems={'center'}>
        <Spinner></Spinner>
      </View>
    );
  }

  if (!teams.length) {
    return (
      <View>
        <Center flex={1}>
          <Column alignItems={'center'} space={6}>
            <Heading color={'primary.500'}>You have no team!</Heading>
            <Column w={'75%'} space={5}>
              <Button>Join team</Button>
              <Button variant={'outline'} onPress={() => navigation.navigate('CreateTeam')}>
                Create team
              </Button>
            </Column>
          </Column>
        </Center>
      </View>
    );
  }

  return (
    <View>
      <Swiper>
        {teams.map((team) => (
          <Column key={team.id} alignItems={'center'}>
            <Text>{team.location}</Text>
            <Text>{team.name}</Text>
            {/* TODO add team logo */}
            <Text bold>
              <Text color={'green.700'}>W: {team.wins}</Text>
              <Text color={'red.700'}>L: {team.loses}</Text>
              <Text color={'primary.500'}>G: {team.wins + team.loses}</Text>
            </Text>
            {/* TODO add elo icons */}
            <Text>{!team.elo ? '0' : team.elo}</Text>
            <FlatList
              data={team.TeamMember}
              renderItem={({ item }) => <Text>{item.User.username}</Text>}
              keyExtractor={(item: User) => item.username}
            />
          </Column>
        ))}
        {/* <FlatList
          data={teams}
          renderItem={({ item }) => (
            <Text>
              {item.location} {item.name}
            </Text>
          )}
          keyExtractor={(item) => item.id}
        /> */}
      </Swiper>
    </View>
  );
}
