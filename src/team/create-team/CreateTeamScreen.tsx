import { Controller, useForm } from 'react-hook-form';

// theme
import { Button, View, Input, Column } from 'native-base';
import { Emoji } from '@common/theme';

// hooks
import { useTeamApi } from '@team/hooks/useTeamApi';

// types
import { AxiosError, AxiosResponse } from 'axios';
import { TeamStackScreenProps } from '@team/navigation/types';

export default function CreateTeamScreen({ navigation }: TeamStackScreenProps<'CreateTeam'>) {
  const { control, handleSubmit } = useForm();
  const { createTeam } = useTeamApi();
  const onSubmit = (data: any) => {
    const team = {
      name: data.name,
      location: data.location,
    };

    createTeam(team)
      .then((response: AxiosResponse) => navigation.navigate('TeamList'))
      .catch((error: AxiosError) => console.log(error.message));
  };
  return (
    <View flex={1} alignItems={'center'}>
      <Column
        w={{
          base: '75%',
          md: '25%',
        }}
        space={5}
        mt={10}
        alignItems={'center'}
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              InputLeftElement={<Emoji name="seedling" />}
              placeholder="name"
              value={value}
              onChangeText={(value) => onChange(value)}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Field is required!',
            },
          }}
        />

        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <Input
              InputLeftElement={<Emoji name="camping" />}
              placeholder="location"
              value={value}
              onChangeText={(value) => onChange(value)}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Field is required!',
            },
          }}
        />
        <Button onPress={handleSubmit(onSubmit)}>Create</Button>
      </Column>
    </View>
  );
}
