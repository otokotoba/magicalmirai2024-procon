import { createTheme } from '@mui/material';

export const theme = createTheme({
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
