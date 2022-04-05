import { Button, Center, Column, Heading } from 'native-base';

export default function NoTeam({ navigate }: any) {
  return (
    <Center flex={1}>
      <Column alignItems={'center'} space={6}>
        <Heading color={'primary.500'}>You have no team!</Heading>
        <Column w={'75%'} space={5}>
          <Button>Join team</Button>
          <Button variant={'outline'} onPress={navigate}>
            Create team
          </Button>
        </Column>
      </Column>
    </Center>
  );
}
