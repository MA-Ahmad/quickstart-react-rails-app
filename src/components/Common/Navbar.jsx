import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link as ChakraLink,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuthDispatch } from '../../contexts/auth';
import authenticationApi from '../../apis/authentication';
import { resetAuthTokens } from '../../apis/axios';
import { useUserState } from '../../contexts/user';
import { Link } from 'react-router-dom';

const Links = ['QuickStart', 'Profile'];

const NavLink = props => (
  <ChakraLink
    as={Link}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to={`/${props.link}`}
  >
    {props.link}
  </ChakraLink>
);

const Navbar = () => {
  const { user } = useUserState();
  const contact = user ? `${user.first_name} ${user.last_name}` : 'user';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authDispatch = useAuthDispatch();
  const handleLogout = async () => {
    try {
      await authenticationApi.logout();
      authDispatch({ type: 'LOGOUT' });
      resetAuthTokens();
      window.location.href = '/';
    } catch (error) {
      //   Toastr.error(error);
    }
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: !isOpen ? 'none' : 'inherit' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(link => (
                <NavLink key={link} link={link} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                size={'sm'}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                _hover={{ textDecoration: 'none' }}
              >
                <Avatar size={'sm'} name={contact} />
              </MenuButton>
              <MenuList fontSize={17}>
                <MenuItem as={Link} to="/profile">
                  My profile
                </MenuItem>
                <MenuItem as={Link} to="/account/edit">
                  Change password
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link} link={link} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
