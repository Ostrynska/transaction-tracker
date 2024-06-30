import React from 'react';
import { Text, VStack } from '@chakra-ui/react';

const NotFound: React.FC = () => {
  return <VStack spacing={4} mt={4}><Text fontSize="lg" color="gray.500">404 - Page Not Found</Text></VStack>;
};

export default NotFound;