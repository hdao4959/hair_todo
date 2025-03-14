import { Box } from '@mui/material';
import theme from "../theme"
import { mockData } from '~/apis/mock-data';
const {board} = mockData;
const BoardBar = () => {
  return (
    <Box sx={{ 
      width: "100%", 
      height: theme.appCustom.boardBarHeight,
      padding: 2, 
      display: "flex", 
      alignItems: 'center', 
      color: "primary.light",
      backgroundColor: "primary.main",
      backgroundColor: "gray",
      color: 'white'
       }}>
        {board?.description}
    </Box>
  )
}

export default BoardBar
