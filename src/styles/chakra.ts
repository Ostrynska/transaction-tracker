import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  styles: {
    global: {
      'html, body': {
        color: 'gray.600',
        lineHeight: 'tall',
        minHeight: '100vh',
      },
      a: {
        textDecoration: 'none !important',
      }
    },
  },
});

export default theme;
