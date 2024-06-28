import { Height } from './../../node_modules/csstype/index.d';
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  colors: {
    brand: {
      50: '#e3f8ff',
      100: '#b3ecff',
      200: '#81defd',
      300: '#5ed0fa',
      400: '#40c3f7',
      500: '#2bb0ed',
      600: '#1992d4',
      700: '#127fbf',
      800: '#0b69a3',
      900: '#035388',
    },
  },
  styles: {
    global: {
      'html, body': {
        color: 'gray.600',
        lineHeight: 'tall',
        minHeight: '100vh',
        // display: 'flex',
        // flexWrap: 'wrap',
        // alignContent: 'space-between',
        // justifyContent: 'center',
        // padding: '0 0 60px'
      },
      a: {
        color: 'teal.500',
          },
    },
  },
});

export default theme;
