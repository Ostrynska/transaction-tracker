import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Center } from '@chakra-ui/react';

const LoginForm: React.FC = () => {
  const handleLogin = () => {
  };

  return (
    <Center mt={160}>
      <Box
        bg="white"
        p={6}
        rounded="md"
        boxShadow="lg"
        w={{ base: '90%', sm: '70%', md: '50%', lg: '30%' }}
      >
        <VStack spacing={4}>
          <Heading as="h1" size="lg">
            Login
          </Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button colorScheme="teal" size="md" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginForm;
