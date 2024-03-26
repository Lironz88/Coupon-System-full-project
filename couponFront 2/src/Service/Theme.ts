// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: 'rgb(21, 21, 21)', 
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
            fontSize: '1rem', 
            padding: '12px 24px',
          '&:hover': {
            fontWeight: 'bold'
          }
        },
      },
    },
  },
});

export default theme;
