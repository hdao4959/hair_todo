import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme, createTheme } from '@mui/material/styles';
// Tạo theme với hỗ trợ colorSchemes
export const NavBarHeight = "50px";
export const BoardBarHeight = "40px";
const theme = createTheme({
  appCustom:{
    navBarHeight: NavBarHeight,
    boardBarHeight: BoardBarHeight,
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
