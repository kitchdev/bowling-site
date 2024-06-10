import { Ubuntu } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#013162',
    },
    secondary: {
      main: '#9cad0a',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    warning: {
      main: '#ffb74d',
    }
  },
  typography: {
    fontFamily: ubuntu.style.fontFamily,
  },
  components: {

    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;
