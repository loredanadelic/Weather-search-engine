import { DefaultTheme } from 'styled-components';

export type Theme = {
  color: {
    main: {
      white: string;
      onyxBlack: string;
      hansBlue: string;
    };
    secondary: {
      dimGrey: string;
      silver: string;
      platinum: string;
    };
  };
  spacing: {
    extraSmall: string;
    small: string;
    mediumSmall: string;
    medium: string;
    large: string;
    larger: string;
    extraLarge: string;
    superLarge: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  fontSize: {
    small: string;
    mediumSmall: string;
    medium: string;
    mediumLarge: string;
    large: string;
    subtitle: string;
    subtitleLarge: string;
    title: string;
  };
};

export const defaultTheme: DefaultTheme & Theme = {
    color: {
      main: {
        white: '#ffffff',
        onyxBlack: '#121212',
        hansBlue: '#5144f7',
      },
      secondary: {
        dimGrey: '#939393',
        silver: '#c4c4c4',
        platinum: '#f2f2f2',
      },
    },
    spacing: {
      extraSmall: '0.25rem',
      small: '0.5rem',
      mediumSmall: '0.75rem',
      medium: '1rem',
      large: '1.5rem',
      larger: '1.75rem',
      extraLarge: '2rem',
      superLarge: '3rem',
    },
    breakpoints: {
      mobile: '600px',
      tablet: '850px',
      desktop: '1280px',
    },
    fontSize: {
      small: '0.5rem',
      mediumSmall: '0.85rem',
      medium: '1rem',
      mediumLarge: '1.5rem',
      large: '2rem',
      subtitle: '2.5rem',
      subtitleLarge: '3rem',
      title: '4rem',
    },
  };
  