import { FormEvent, ChangeEvent, useState } from 'react';
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
  HStack,
  Center,
  Link as ChakraLink,
  Box,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@chakra-ui/icons';

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

export default function New() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('initial');
  const [error, setError] = useState(false);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={5} mx={'auto'} maxW={'lg'} py={8} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Forgot your password?</Heading>
        </Stack>
        <Container
          bg={useColorModeValue('white', 'whiteAlpha.100')}
          boxShadow={'xl'}
          rounded={'lg'}
          p={6}
          minWidth={['16em', '20em']}
          direction={'column'}
        >
          <Stack
            justifyContent="center"
            // direction={'column'}
            direction={{ base: 'column', md: 'row' }}
            as={'form'}
            // spacing={'12px'}
            onSubmit={e => {
              e.preventDefault();
              setError(false);
              setState('submitting');
              // remove this code and implement your submit logic right here
              setTimeout(() => {
                if (email === 'fail@example.com') {
                  setError(true);
                  setState('initial');
                  return;
                }
                setState('success');
              }, 1000);
            }}
          >
            <FormControl>
              <Input
                variant={'solid'}
                borderWidth={1}
                color={'gray.800'}
                _placeholder={{
                  color: 'gray.400',
                }}
                borderColor={useColorModeValue('gray.300', 'gray.700')}
                id={'email'}
                type={'email'}
                required
                placeholder={'Your Email'}
                aria-label={'Your Email'}
                value={email}
                disabled={state !== 'initial'}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl w={{ base: '100%', md: '40%' }}>
              <Button
                colorScheme={state === 'success' ? 'green' : 'blue'}
                isLoading={state === 'submitting'}
                w="100%"
                type={state === 'success' ? 'button' : 'submit'}
              >
                {state === 'success' ? <CheckIcon /> : 'Submit'}
              </Button>
            </FormControl>
          </Stack>
          <Text
            mt={2}
            textAlign={'center'}
            color={error ? 'red.500' : 'gray.500'}
          >
            {error
              ? 'Oh no an error occured! 😢 Please try again later.'
              : "You won't receive any spam! ✌️"}
          </Text>
        </Container>
        <Box px={8}>
          <HStack justifyContent="space-between" textAlign={'center'}>
            <InternalLink text={'Back'} path={'/signin'} />
            <InternalLink text={'Signup'} path={'/signup'} />
          </HStack>
        </Box>
      </Stack>
    </Flex>
  );
}
