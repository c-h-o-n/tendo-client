/* eslint-disable @typescript-eslint/no-empty-interface */
import { ColorMode, extendTheme } from 'native-base';

export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: 'light',
  },
  colors: {
    background: {
      light: '#eee',
      dark: '#333',
    },
    primary: {
      50: '#dff8ff',
      100: '#b3e7ff',
      200: '#85d7fd',
      300: '#59c6fb',
      400: '#38b7fa',
      500: '#299de1',
      600: '#1c7baf',
      700: '#0f587e',
      800: '#00354d',
      900: '#00131d',
    },
    secondary: {
      50: '#ffeedc',
      100: '#ffd1ae',
      200: '#ffb37e',
      300: '#ff964c',
      400: '#fe791b',
      500: '#e45f01',
      600: '#b34a00',
      700: '#803400',
      800: '#4e1f00',
      900: '#1f0800',
    },
    success: '#198754',
    warning: '#FFAF28',
    danger: '#F94144',
  },
  components: {
    View: {
      baseStyle: ({ colorMode }: { colorMode: ColorMode }) => {
        return {
          flex: 1,
          bg: colorMode === 'dark' ? 'background.dark' : 'background.light',
        };
      },
    },
    Input: {
      defaultProps: {
        autoCapitalize: 'none',
        variant: 'underlined',
        size: 'lg',
      },
    },
  },
});

type CustomThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
