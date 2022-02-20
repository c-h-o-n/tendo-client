import { Column, FlatList, Text } from 'native-base';
import { useState } from 'react';
import { Team, User } from '../../../types';

export default function TeamCard({ team }: any) {
  return (
    <Column mt={1} alignItems={'center'}>
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
        data={team.members}
        renderItem={({ item }) => <Text>{item.username}</Text>}
        keyExtractor={(item: User) => item.id}
      />
    </Column>
  );
}
