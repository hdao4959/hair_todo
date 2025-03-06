import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme, createTheme } from '@mui/material/styles';
// Tạo theme với hỗ trợ colorSchemes
const theme = createTheme({
  appCustom:{
    navBarHeight: "50px",
    boardBarHeight: "40px",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange

      }
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
  
});

export default theme;
