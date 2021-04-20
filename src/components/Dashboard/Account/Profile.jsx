import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  useColorModeValue,
  HStack,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useUserState } from '../../../contexts/user';

const Profile = () => {
  const { user } = useUserState();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
    }
  }, [user]);

  return (
    <Flex
      minH={'90vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={5} mx={'auto'}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'}>Profile</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          minWidth={['16em', '25em']}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} isReadOnly />
            </FormControl>
            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Input type="text" value={firstName} isReadOnly />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input type="text" value={lastName} isReadOnly />
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Profile;
