import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
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
import registrationsApi from '../../../apis/registrations';
import { useUserState } from '../../../contexts/user';

const AccountEdit = ({ history }) => {
  const { user } = useUserState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    password: Yup.string().required('New password is required'),
    confirmPassword: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const formikInputAttrs = {
    type: 'password',
    'aria-required': 'true',
    placeholder: '******',
  };

  const handleSubmit = async data => {
    try {
      setLoading(true);
      const {
        data: { notice },
      } = await registrationsApi.updatePassword({
        user: {
          email: user.email,
          current_password: data.currentPassword,
          password: data.password,
          password_confirmation: data.confirmPassword,
        },
      });
      history.push('/');
      toast({
        description: notice,
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
    } catch (error) {
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
      minH={'90vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={5} mx={'auto'}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'}>Change Password</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          minWidth={['16em', '25em']}
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{
                currentPassword: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                handleSubmit(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Stack spacing={3}>
                    <Box>
                      <Field name="currentPassword" width={'100%'}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.currentPassword &&
                              form.touched.currentPassword
                            }
                          >
                            <FormLabel htmlFor="currentPassword">
                              Current password *
                            </FormLabel>
                            <Input
                              {...field}
                              id="currentPassword"
                              type="password"
                              placeholder="******"
                            />
                            <FormErrorMessage mt={0}>
                              {form.errors.currentPassword}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="password" width={'100%'}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.password && form.touched.password
                            }
                          >
                            <FormLabel htmlFor="password">
                              New password *
                            </FormLabel>
                            <Input
                              {...field}
                              id="password"
                              type="password"
                              placeholder="******"
                            />
                            <FormErrorMessage mt={0}>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="confirmPassword" width={'100%'}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.confirmPassword &&
                              form.touched.confirmPassword
                            }
                          >
                            <FormLabel htmlFor="confirmPassword">
                              Confirm password *
                            </FormLabel>
                            <Input
                              {...field}
                              id="confirmPassword"
                              type="password"
                              placeholder="******"
                            />
                            <FormErrorMessage mt={0}>
                              {form.errors.confirmPassword}
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
                        Update
                      </Button>
                    </Stack>
                    {/* <Field name="password" />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null} */}
                    {/* <Field name="confirmPassword" type="password" />
                    {errors.confirmPassword && touched.confirmPassword ? <div>{errors.confirmPassword}</div> : null} */}
                    {/* <button type="submit">Submit</button> */}
                  </Stack>
                </Form>
              )}
              {/* <form>
                
                <FormControl id="currentPassword" name="currentPassword">
                  <FormLabel>Current password *</FormLabel>
                  <Input type="password" value={currentPassword} />
                </FormControl>
                <FormControl id="password" name="password">
                  <FormLabel>Password *</FormLabel>
                  <Input type="password" value={password} />
                </FormControl>
                <FormControl id="confirmPassword" name="confirmPassword">
                  <FormLabel>Confirm password</FormLabel>
                  <Input type="password" value={confirmPassword} />
                </FormControl>
                <Button
                  name="submit"
                  type="submit"
                  className="w-full flex justify-center items-center"
                  label="Update"
                />
              </form> */}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default AccountEdit;
