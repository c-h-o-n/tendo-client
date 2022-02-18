import axios, { AxiosError, AxiosResponse } from 'axios';
import { Button, View, Input, Column } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { TeamStackScreenProps } from '../navigation/types';
import { Emoji } from '../theme';

export default function CreateTeamScreen({ navigation }: TeamStackScreenProps<'CreateTeam'>) {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post('/team', { name: data.name, location: data.location })
      .then((response: AxiosResponse) => navigation.navigate('Home'))
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
