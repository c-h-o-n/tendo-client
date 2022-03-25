import { FontAwesome5 } from '@expo/vector-icons';
import { Icon, IconButton, Input, View, Row, Text, Actionsheet, useDisclose, Box } from 'native-base';

import { CourtStackScreenProps } from '@court/navigation/types';
import { Emoji } from '@common/theme';
import { useSearchApi } from './hooks/useSearchApi';
import { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { Team } from '../types';
import Dashboard from './components/Dashboard';

export default function CourtScreen({ navigation }: CourtStackScreenProps<'Court'>) {
  const { search } = useSearchApi();

  const onSearch = (e: string) => {
    search(e)
      .then((response: AxiosResponse) => {
        setResults(response.data);
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
    setTerm(e);
  };

  const [term, setTerm] = useState('');
  const [results, setResults] = useState<any>(null);

  const navigateToChat = () => {
    navigation.navigate('Chat');
  };

  const navigateToTeam = (team: Team) => {
    onClose();

    navigation.push('TeamDetails', { id: team.id });
  };

  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <View>
      <Row space={2} px={2} justifyContent={'space-between'}>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content minH={'75%'} alignItems={'flex-start'}>
            {results && (results.teams.length || results.users.length) && term.length ? (
              <Box>
                <Text>Teams</Text>
                {results.teams.map((result: any) => (
                  <Actionsheet.Item key={result.id} onPress={() => navigateToTeam(result)}>
                    {result.name}
                  </Actionsheet.Item>
                ))}
                <Text>Users</Text>
                {results.users.map((result: any) => (
                  <Actionsheet.Item key={result.id} onPress={() => console.log('item pressed')}>
                    {result.username}
                  </Actionsheet.Item>
                ))}
              </Box>
            ) : (
              <Text w={'full'} textAlign={'center'}>
                No results
              </Text>
            )}
          </Actionsheet.Content>
        </Actionsheet>
        <Input
          flex={1}
          InputLeftElement={<Emoji name="mag" />}
          onChangeText={onSearch}
          onPressIn={onOpen}
          placeholder="search..."
        />
        <IconButton icon={<Icon as={FontAwesome5} name="comment-dots" />} onPress={navigateToChat} />
      </Row>
      <Dashboard />
    </View>
  );
}