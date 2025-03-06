import { Box } from '@mui/material';
import theme from "../theme"
const BoardContent = () => {
  return (
    <Box sx={{ 
      width: "100%", 
      height: `calc(100vh - ${theme.appCustom.navBarHeight} - ${theme.appCustom.boardBarHeight})`,
      padding: 2, 
      display: "flex", 
      alignItems: 'center', 
      // backgroundColor: "primary.dark" 
      }}>
        Board Content
    </Box>
  )
}

export default BoardContent
