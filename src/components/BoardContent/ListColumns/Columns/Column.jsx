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
  } = useSortable({ id: column._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isDragging ? 'isDragging' : ''}`}
      key={column._id}
      sx={{
        width: 250,
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
      <Box sx={{ px: 0.5 }}>
        <Box sx={{
          maxHeight: `calc(${theme.appCustom.boardContentHeight} - 100px)`,
          overflowY: 'auto',
          // Custom thanh scrollbar bên phải column
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: '4px',
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#a7a7a0",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#8f8f89",
          }
        }}>
          {/* Danh sách các thẻ trong column */}
          {/* <SortableContext items={arrayColumns}
            strategy={horizontalListSortingStrategy}> */}
            <ListCards cards={sortedArray(column?.cards, column?.cardOrderIds, '_id')} />
          {/* </SortableContext> */}
        </Box>
        {/* Button add new card */}
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

    </Box>

  );
}




export default Column
