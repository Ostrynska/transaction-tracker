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
      <Flex>
      <Link
        href="https://t.me/kateryna_ostrynska"
        isExternal
        marginRight='10px'
        aria-label="Telegram">
          <FaTelegramPlane size={18} color='teal'/>
      </Link>
      <Link
        href="https://www.linkedin.com/in/kateryna-ostrynska-9155b0151/"
        isExternal
        aria-label="LinkedIn" >
          <FaLinkedin size={18} color='teal'/>
      </Link>
        </Flex>
      </Flex>
    </Box>
    </>
  );
};

export default Footer;
