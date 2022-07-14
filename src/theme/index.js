import {extendTheme} from 'native-base';

export const customTheme = extendTheme({
  colors: {
    dark: {
      100: '#35383F',
      200: '#1F212A',
      300: '#181A20',
      400: '#182828',
    },
    primary: {
      50: '#FDEBED',
      100: '#2B1928',
      300: '#E0202F',
      400: '#E21221',
      500: '#D01416',
      600: '#E81827',
      700: '#C1232E',
      800: '#D11A29',
      900: '#F11927',
    },
  },
  config: {
    initialColorMode: 'dark',
  },
});
