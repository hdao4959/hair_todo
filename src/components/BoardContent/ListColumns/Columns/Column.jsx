import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import theme from '~/theme';
import ListCards from './ListCards/ListCards';
import { sortedArray } from '~/utils/sortedArray';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddIcon from '@mui/icons-material/Add';
import {
  horizontalListSortingStrategy,
  arrayMove,
  SortableContext,
} from '@dnd-kit/sortable';
function Column({ column }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column._id , data: column});

  const columnStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    
    <Box ref={setNodeRef}
      style={columnStyle}
      {...attributes}
      {...listeners}
      className={`${isDragging ? 'isDragging' : ''}`}
      key={column._id}
      sx={{
        cursor: 'pointer',
        maxWidth: 250,
        minWidth: 250,
        height: `calc(${theme.appCustom.boardContentHeight} - 20px)`,
        backgroundColor: 'primary.main',
        borderRadius: 2,
      }}>

      {/* Tiêu đề của column */}
      <Typography
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: 'center',
          px: 1
        }}>

        {column?.title}
        {/* <Button sx={{ color: "white" }}>{}</Button> */}
        <Tooltip title="More">
          <IconButton sx={{ color: "white" }}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Typography>

      <ListCards cards={sortedArray(column?.cards, column?.cardOrderIds, '_id')} />

        <Button sx={{
          width: '100%',
          // backgroundColor: 'white',
          color: 'white',
          border: 'none',
          '&:hover': {
            backgroundColor: 'white',
            color: 'primary.main'
          }
        }}>
          <AddIcon /> Add new card
        </Button>
    </Box>

  );
}




export default Column
