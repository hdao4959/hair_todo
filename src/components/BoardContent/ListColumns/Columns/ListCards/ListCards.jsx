import Card from './Cards/Card';
import { Box } from '@mui/material';
import { DndContext, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import theme from '~/theme';

const ListCards = ({ cards }) => {

  return (

    <Box sx={{
      paddingX: 0.5,
      // overflowY: 'hidden',
      // overflowX: 'hidden'
    }}>
      <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
        {/* <Box sx={{
          // px: 0.5
        }}> */}
          <Box sx={{
            px: 0.5,
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
            
            {cards.map((card) => (
              <Card key={card._id} id={card._id} card={card} />
            )
            )}
          </Box>
          {/* </Box> */}
      </SortableContext>
    </Box>
  )
}

export default ListCards
