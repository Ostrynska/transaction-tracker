import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Header from './Header';
import Footer from './Footer';

import { Spinner } from '@chakra-ui/react'

export const SharedLayout = () => {
 return (
  <>
    <Header />
        <Box as="main" maxW="1200px" mx="auto" pt={16} pb={16} w={'100%'} margin={'0 auto'} h={'95vh'} >
            <Suspense fallback={<Spinner mt={135} mb={135} ml={'auto'} color='teal' size='xl'emptyColor='gray.200' />}>
            <Outlet />
            </Suspense>
        </Box>
    <Footer />
  </>
 );
};