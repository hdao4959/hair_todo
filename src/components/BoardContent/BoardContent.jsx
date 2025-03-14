import { Box } from '@mui/material';
import ListColumns from './ListColumns/ListColumns';
import theme from '~/theme';
import { Button } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { mockData } from '~/apis/mock-data';
import { sortedArray } from '~/utils/sortedArray';

const BoardContent = () => {
  const {board} = mockData;
  const sortedColumn = sortedArray(board?.columns, board?.columnOrderIds, '_id')

    
  return (
    <Box sx={{
      width: "100%",
      height: theme.appCustom.boardContentHeight,
      display: "flex",
      alignItems: 'center',
      gap: 1,
      px: 1,
      // pt: 1,
      overflowX: 'auto',
      // backgroundColor: "primary.main" 
    }}>

      {/* Danh sách các cột */}
      <ListColumns columns={sortedColumn} />

      <Button sx={{
        width: 250,
        minWidth: 250,
        bgcolor: 'primary.main',
        color: 'white',
        alignSelf: 'flex-start',  
        mt: 1.5,      
        "&:hover": {
          color: 'white',
          bgcolor: 'secondary.main',

        }
      }} startIcon={<PostAddIcon />}>Add new column</Button>
    </Box>
  )
}

export default BoardContent
