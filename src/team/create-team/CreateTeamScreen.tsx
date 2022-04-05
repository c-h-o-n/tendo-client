import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

import { Button, View, Input, Column } from 'native-base';
import { Emoji } from '@common/theme';

// hooks
import { useTeamApi } from '@team/hooks/useTeamApi';
import { useState } from 'react';

// types
import { AxiosError, AxiosResponse } from 'axios';
import { TeamStackScreenProps } from '@team/navigation/types';

// TODO: LOGO upload
export default function CreateTeamScreen({ navigation }: TeamStackScreenProps<'CreateTeam'>) {
  const { control, handleSubmit } = useForm();
  const { createTeam, uploadLogo } = useTeamApi();

  const onSubmit = (data: any) => {
    const team = {
      name: data.name,
      location: data.location,
      logo: image,
    };

    // uploadLogo('881387c3-0075-4d70-8d36-9580893fdde8', image)
    //   .then((resp) => console.log(resp))
    //   .catch((err: AxiosError) => console.log(err.request));
    createTeam(team)
      .then((response: AxiosResponse) => navigation.navigate('TeamList'))
      .catch((error: AxiosError) => console.log(error.message));
  };

  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View flex={1} alignItems={'center'}>
      <Column w={'75%'} space={5} mt={10} alignItems={'center'}>
        {/* location */}
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

        {/* name */}
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

        <Button onPress={pickImage} variant="outline">
          Browse team logo
        </Button>

        <Button onPress={handleSubmit(onSubmit)}>Create</Button>
      </Column>
    </View>
  );
}
