import React, { useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Center, useToast } from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";

const LoginForm: React.FC = () => {
  const toast = useToast();
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    toast({
      title: "Under Development",
      description: "This page is still under development. Please check back later.",
      status: "info",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
  }, [toast]);

  // const handleLogin = () => {
  // };

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
          <Button colorScheme="teal" size="md" onClick={() => loginWithRedirect()}>
            Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginForm;
