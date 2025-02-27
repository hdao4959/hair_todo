import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme, createTheme } from '@mui/material/styles';
// Tạo theme với hỗ trợ colorSchemes
const theme = createTheme({
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
});

export default theme;
