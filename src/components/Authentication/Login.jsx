import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { setAuthHeaders } from '../../apis/axios';
import authenticationApi from '../../apis/authentication';
import { useAuthDispatch } from '../../contexts/auth';
import { useUserDispatch } from '../../contexts/user';
import { Formik, Field } from 'formik';
import { validateEmail, validatePassword, validateName } from './validations';

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

const Login = ({ history }) => {
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
  });
  
  const [loading, setLoading] = useState(false);
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  const toast = useToast();

  const handleSubmitExternally = async values => {
    const { email, password } = values;
    try {
      setLoading(true);
      const {
        data: { auth_token, user, is_admin },
      } = await authenticationApi.login({ user: { email, password } });
      authDispatch({ type: 'LOGIN', payload: { auth_token, email, is_admin } });
      userDispatch({ type: 'SET_USER', payload: { user } });
      setAuthHeaders();
      history.push('/');
      toast({
        description: 'Logged in successfully.',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: 'Incorrect email or password',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
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
          <Heading fontSize={'4xl'}>Sign In</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          minWidth={['16em', '20em']}
          p={8}
        >
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              handleSubmitExternally(values);
              //   actions.resetForm({});
              //   actions.setSubmitting(false);
            }}
          >
            {({ values, handleChange, handleSubmit, isSubmitting }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <Box>
                      <Field
                        name="email"
                        validate={validateEmail}
                        width={'100%'}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <FormLabel htmlFor="email">Email *</FormLabel>
                            <Input
                              {...field}
                              id="email"
                              placeholder="Email"
                              value={values.email}
                              onChange={handleChange}
                            />
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field
                        name="password"
                        validate={validatePassword}
                        width={'100%'}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.password && form.touched.password
                            }
                          >
                            <FormLabel htmlFor="password">Password *</FormLabel>
                            <Input
                              {...field}
                              type="password"
                              id="password"
                              placeholder="******"
                              value={values.password}
                              onChange={handleChange}
                            />
                            <FormErrorMessage>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Stack spacing={10}>
                      <Button
                        isLoading={loading}
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
                  </Stack>
                </form>
              );
            }}
          </Formik>
        </Box>
        <Box px={8}>
          <HStack justifyContent="space-between">
            <InternalLink text={'Signup'} path={'/signup'} />
            <InternalLink text={'Forgot password?'} path={'/my/password/new'} />
          </HStack>
        </Box>
      </Stack>
    </Flex>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
