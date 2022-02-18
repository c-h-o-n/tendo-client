import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { ColorMode, extendTheme, Factory } from 'native-base';
import NativeEmoji from 'react-native-emoji';
import NativeSwiper from 'react-native-swiper';
// nativebase
export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: 'light',
  },
  colors: {
    background: {
      light: '#ECF0F1',
      dark: '#2B2D42',
    },
    primary: {
      50: '#def6ff',
      100: '#b7defa',
      200: '#8ec6f1',
      300: '#62afe8',
      400: '#3898e0',
      500: '#1f7fc7',
      600: '#13639c',
      700: '#074770',
      800: '#002a46',
      900: '#000f1d',
    },
    secondary: {
      50: '#ffebdd',
      100: '#ffcbb0',
      200: '#ffa880',
      300: '#fd874e',
      400: '#fb651d',
      500: '#e24c04',
      600: '#b13a01',
      700: '#7e2900',
      800: '#4d1700',
      900: '#200400',
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
    Text: {
      defaultProps: {
        fontSize: 'lg',
      },
    },
    Input: {
      defaultProps: {
        variant: 'outline',
        p: 3,
        size: 'lg',
        fontSize: 'lg',
        autoCapitalize: 'none',
      },
    },
    Button: {
      defaultProps: {
        size: 'lg',
      },
    },
    Spinner: {
      baseStyle: {
        color: 'primary.500',
      },
      defaultProps: {
        size: 'lg',
      },
    },
  },
});

// Emoji icons
export const Emoji = Factory(NativeEmoji, { defaultProps: { ml: 2 } });
export const Swiper = Factory(NativeSwiper, {
  defaultProps: {
    pt: 4,
    activeDotColor: theme.colors.secondary[400],
    paginationStyle: { top: 0, bottom: undefined },
    loop: false,
    bounces: true,
  },
});

type CustomThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

// react navigation
export const NavigationDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.colors.primary[500],
    card: theme.colors.background.dark,
  },
};

export const NavigationLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary[500],
    card: theme.colors.background.light,
  },
};
