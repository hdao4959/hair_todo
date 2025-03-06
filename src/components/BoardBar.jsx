import { Box } from '@mui/material';
import theme from "../theme"

const BoardBar = () => {
  return (
    <Box sx={{ 
      width: "100%", 
      height: theme.appCustom.boardBarHeight,
      padding: 2, 
      display: "flex", 
      alignItems: 'center', 
      color: "primary.light",
      backgroundColor: "primary.main"
       }}>
        Board Bar
    </Box>
  )
}

export default BoardBar
