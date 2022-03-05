import TeamCard from '@team/team-list/components/TeamCard';
import TeamMembersList from '@team/team-list/components/TeamMembersList';
import { Column, ScrollView } from 'native-base';
import { Team } from '../../types';

export default function TeamDetails({ team }: { team: Team }) {
  return (
    <ScrollView pt={1}>
      <Column alignItems={'center'} space={4}>
        <TeamCard team={team} />
        <TeamMembersList members={team.members} />
      </Column>
    </ScrollView>
  );
}
