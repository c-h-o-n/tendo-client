import { FontAwesome5 } from '@expo/vector-icons';
import { Icon, IconButton, Input, View, Row, Toast } from 'native-base';
import { Emoji } from '@common/theme';

// hooks
import { useSearchApi } from './hooks/useSearchApi';
import { useState } from 'react';

// types
import { CourtStackScreenProps } from '@court/navigation/types';
import { AxiosError, AxiosResponse } from 'axios';

import Dashboard from './components/Dashboard';
import SearchResults from './components/SearchResults';

export default function CourtScreen({ navigation }: CourtStackScreenProps<'Court'>) {
  const { search } = useSearchApi();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any>(null);

  const onSearch = (e: string) => {
    setSearchTerm(e);
    search(e)
      .then((response: AxiosResponse) => {
        setResults(response.data);
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  };

  const navigateToChat = () => {
    navigation.navigate('Chat');
  };

  return (
    <View>
      <Row space={2} px={2} justifyContent={'space-between'}>
        <Input flex={1} InputLeftElement={<Emoji name="mag" />} onChangeText={onSearch} placeholder="search..." />
        <IconButton icon={<Icon as={FontAwesome5} name="comment-dots" />} onPress={navigateToChat} />
      </Row>
      {searchTerm.length && results ? <SearchResults results={results} /> : <Dashboard />}
    </View>
  );
}
