import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';

export default function MainSection() {
  return (
    <Stack style={{ minHeight: 'calc(100vh - 4rem)' }} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              QuickStart
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              React + Rails
            </Text>{' '}
          </Heading>
          <Flex justifyContent="center" textAlign="left">
            <UnorderedList>
              <ListItem>Uses React on Front-end.</ListItem>
              <ListItem>Uses Context API for state management.</ListItem>
              <ListItem>Uses Rails on Back-end.</ListItem>
              <ListItem>Uses ChakraUI for UI.</ListItem>
              <ListItem>Uses Devise for User authentication(token based).</ListItem>
              <ListItem>Uses PostgreSQL database.</ListItem>
            </UnorderedList>
          </Flex>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}
