import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    subPalette: {
      primary: string;
      secondary: string;
    };
  }

  interface ThemeOptions {
    subPalette?: {
      primary?: string;
      secondary?: string;
    };
  }
}

export const theme = createTheme({
  subPalette: {
    primary: '#81d5cd',
    secondary: '#afc9e7',
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'div',
          h2: 'div',
          h3: 'div',
          h4: 'div',
          h5: 'div',
          h6: 'div',
        },
      },
    },
  },
});
