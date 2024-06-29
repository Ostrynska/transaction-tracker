import React from 'react';
import { Box, Flex, Heading, Button, useBreakpointValue, Divider, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { IoLogInSharp } from "react-icons/io5";

const Header: React.FC = () => {
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <>
      <Box as="header" width="100%" bg="white" boxShadow="sm">
        <Flex
          justify="space-between"
          align="center"
          maxW="1200px"
          mx="auto"
          pt={6}
          pb={2}
        >
        <Heading as="h2" size="lg" fontSize='24px'>
            <NavLink to="/"><Text fontWeight="bold" color='teal'>Transaction Tracker</Text>
                </NavLink>
          </Heading>
                  <Button as={RouterLink} to="/login" colorScheme="teal" size={buttonSize} rightIcon={<IoLogInSharp size={20}/>} >
            Login
          </Button>
        </Flex>
        <Divider />
      </Box>
    </>
  );
};

export default Header;
