import { extendTheme } from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';

export const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
  fonts: {
    heading: 'DM Sans',
    body: 'DM Sans',
  },
  components: {
    Text: {
      baseStyle: {
        letterSpacing: 0.5,
      },
    },
  },
  config: {
    useSystemColorMode: false,
  },
});
