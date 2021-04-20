import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { setAuthHeaders } from '../../apis/axios';

import authenticationApi from '../../apis/authentication';
import { useAuthDispatch } from '../../contexts/auth';
import { useUserDispatch } from '../../contexts/user';

const InternalLink = ({ path, text }) => {
  return (
    <ChakraLink
      as={Link}
      to={path}
      color={'blue.500'}
      _hover={{ color: 'blue.300', textDecoration: 'none' }}
    >
      {text}
    </ChakraLink>
  );
};

const Signup = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const {
        data: { auth_token, user, is_admin },
      } = await authenticationApi.login({ user: { email, password } });
      authDispatch({ type: 'LOGIN', payload: { auth_token, email, is_admin } });
      userDispatch({ type: 'SET_USER', payload: { user } });
      setAuthHeaders();
      history.push('/');
      // Toastr.success("Logged in successfully.");
    } catch (error) {
      // logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={5} mx={'auto'} maxW={'lg'} py={8} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign Up</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          minWidth={['16em', '20em']}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                {/* <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack> */}
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Box px={8}>
          <HStack justifyContent="center">
            <InternalLink text={'Login'} path={'/signin'} />
          </HStack>
        </Box>
      </Stack>
    </Flex>
  );
};

Signup.propTypes = {
  history: PropTypes.object,
};

export default Signup;
