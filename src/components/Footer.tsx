import React from 'react';
import { Box, Flex, Link, Divider, IconButton } from '@chakra-ui/react';
import { FaTelegramPlane, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
   <>
    <Divider />
    <Box as="footer" width="100%" py={4}>
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto" >
        <Link href="https://ostrynska-kateryna.netlify.app/" isExternal color="teal.500" fontWeight="bold">
              Ostrynska Kateryna &copy; 2024</Link>
      <Box>
      <Link
        href="https://t.me/kateryna_ostrynska"
        isExternal
        aria-label="Telegram"
      >
        <IconButton
          icon={<FaTelegramPlane size={18}/>}
          size="md"
          colorScheme="teal"
          variant='ghost'
          aria-label="Telegram"
        />
      </Link>
      <Link
        href="https://www.linkedin.com/in/kateryna-ostrynska-9155b0151/"
        isExternal
        aria-label="LinkedIn"
      >
        <IconButton
          icon={<FaLinkedin size={18}/>}
          size="md"
          colorScheme="teal"
          variant='ghost'
          aria-label="LinkedIn"
        />
      </Link>
        </Box>
      </Flex>
    </Box>
    </>
   
  );
};

export default Footer;
