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
  FormErrorMessage,
  useToast
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

const Signup = ({ history }) => {
  const [initialValues, setInitialValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: '',
  });

  // const [email, setEmail] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const handleSubmitExternally = async values => {
    const { email, firstName, lastName, password, passwordConfirmation } = values;
    try {
      setLoading(true);
      const {
        data: { user, auth_token },
      } = await authenticationApi.signup({
        user: {
          email,
          first_name: firstName,
          last_name: lastName,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      });
      authDispatch({
        type: 'LOGIN',
        payload: { auth_token, email, is_admin: false },
      });
      userDispatch({ type: 'SET_USER', payload: { user } });
      history.push('/');
      toast({
        description: 'Sign up successfully.',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
    } catch (error) {
      // alert(error.response.data.error);
      toast({
        description: error.response.data.error,
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
          <Heading fontSize={'4xl'}>Sign Up</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          minWidth={['16em', '25em']}
          px={8}
          py={6}
        >
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              handleSubmitExternally(values);
            }}
          >
            {({ values, handleChange, handleSubmit, isSubmitting }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
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
                            <FormErrorMessage mt={0}>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field
                        name="firstName"
                        validate={validateName}
                        width={'100%'}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.firstName && form.touched.firstName
                            }
                          >
                            <FormLabel htmlFor="firstName">
                              First name *
                            </FormLabel>
                            <Input
                              {...field}
                              id="firstName"
                              placeholder="Muhammad"
                              value={values.firstName}
                              onChange={handleChange}
                            />
                            <FormErrorMessage mt={0}>
                              {form.errors.firstName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field
                        name="lastName"
                        validate={validateName}
                        width={'100%'}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.lastName && form.touched.lastName
                            }
                          >
                            <FormLabel htmlFor="lastName">
                              Last name *
                            </FormLabel>
                            <Input
                              {...field}
                              id="lastName"
                              placeholder="Ahmad"
                              value={values.lastName}
                              onChange={handleChange}
                            />
                            <FormErrorMessage mt={0}>
                              {form.errors.lastName}
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
                            <FormErrorMessage mt={0}>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field
                        name="passwordConfirmation"
                        validate={validatePassword}
                        width={'100%'}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.passwordConfirmation &&
                              form.touched.passwordConfirmation
                            }
                          >
                            <FormLabel htmlFor="passwordConfirmation">
                              Confirm password *
                            </FormLabel>
                            <Input
                              {...field}
                              type="password"
                              id="passwordConfirmation"
                              placeholder="******"
                              value={values.passwordConfirmation}
                              onChange={handleChange}
                            />
                            <FormErrorMessage mt={0}>
                              {form.errors.passwordConfirmation}
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
                        Sign up
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              );
            }}
          </Formik>
        </Box>
        <Box px={8} minWidth={['16em', '25em']}>
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
