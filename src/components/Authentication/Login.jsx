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
} from '@chakra-ui/react';
import { setAuthHeaders } from '../../apis/axios';

import authenticationApi from '../../apis/authentication';
import { useAuthDispatch } from '../../contexts/auth';
import { useUserDispatch } from '../../contexts/user';

const Login = ({ history }) => {
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
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <ChakraLink color={'blue.400'}>features</ChakraLink> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Link
          className="block mt-2 text-teal-600 hover:text-black"
          to="/signup"
        >
          Signup
        </Link>
        <Link
          className="block mt-2 text-teal-600 hover:text-black"
          to="/my/password/new"
        >
          Forgot password?
        </Link>
      </Stack>
    </Flex>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
