// Mui
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Work Sans',
      'sans-serif',
      '-apple-system'
    ].join(',')
  },
  palette: {
    primary: {
      main: '#48A8D0',
      light: 'rgba(72, 168, 208, 0.12)'
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontSize: '14px',
          lineHeight: '24px',
          fontWeight: 600,
          textTransform: 'capitalize'
        },
        contained: {
          background: 'linear-gradient(315deg, #3D98BF 0%, #53B8E0 100%)',
          color: 'white',
          transition: 'initial',
          '&:hover': {
            background: '#53B8E0'
          }
        }
      }
    },
    MuiIconButton: {
      variants: [
        {
          props: { color: 'primary' },
          style: {
            border: `1px solid rgba(72,168,208,0.5)`,
            padding: '7px',
            '&:hover': {
              backgroundColor: 'rgba(72,168,208,0.1)'
            },
            '&:disabled': {
              borderColor: 'rgba(0,0,0,0.12)'
            }
          }
        }
      ],
      styleOverrides: {
        root: {
          borderRadius: '4px'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      }
    },
  },
});

export default theme;