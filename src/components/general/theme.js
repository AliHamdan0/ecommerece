import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#bf7e68',
    },
    secondary: {
      main: '#d53737',
    },
    cart: {
      main: '#f7f6f7',
      text: '#515151',
    },
    myText: {
      primary: {
        main: '#05313c',
      },
      secondary: {
        main: '#666',
      },
    },
  },
  typography: {
    fontFamily: 'Dosis',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
  },
});
