import React, {useEffect} from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Center, useToast } from '@chakra-ui/react';

const LoginForm: React.FC = () =>
{
  const toast = useToast();

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

  const handleLogin = () =>
  {
    toast({
      title: "Under Development",
      description: "Site Under Construction. We are currently working on our website. Please check back later.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
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
