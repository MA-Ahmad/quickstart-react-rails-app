import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Main from './components/Main';

import { AuthProvider } from './contexts/auth';
import { UserProvider } from './contexts/user';

function App(props) {
  return (
    <AuthProvider>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <Box textAlign="center" fontSize="xl">
            {/* <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        </Grid> */}
            <Main {...props} />
          </Box>
        </ChakraProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
