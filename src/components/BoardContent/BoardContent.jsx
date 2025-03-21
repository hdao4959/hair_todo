import { Box } from '@mui/material';
import ListColumns from './ListColumns/ListColumns';
import theme from '~/theme';
import { Button } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { mockData } from '~/apis/mock-data';
import { sortedArray } from '~/utils/sortedArray';
import Card from './ListColumns/Columns/ListCards/Cards/Card';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import {
  arrayMove,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import Column from './ListColumns/Columns/Column';

const BoardContent = () => {
  const { board } = mockData;
  // state cho mảng các column được sắp xếp theo trình tự của db
  const sortedColumn = sortedArray(board?.columns, board?.columnOrderIds, '_id')

  const [arrayColumns, setArrayColumns] = useState(board?.columnOrderIds);

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const ACTIVE_ITEM_TYLE = {
    COLUMN: 'COLUMN',
    CARD: 'CARD'
  }

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(event?.active?.data?.current?.columnId ?
      ACTIVE_ITEM_TYLE.CARD : ACTIVE_ITEM_TYLE.COLUMN);
    setActiveDragItemData(event?.active?.data?.current);
  }

  const handleDragEnd = (event) => {
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);

    const { active, over } = event;
    if (!over) {
      return
    }

    if (active?.id !== over?.id) {
      if (active?.data?.current?.columnId) {
        // console.log("Kéo card");
      } else {
        // set lại mảng id column để render columns theo trình tự
        setArrayColumns((arrayColumns) => {
          const oldIndex = arrayColumns.indexOf(active.id)
          const newIndex = arrayColumns.indexOf(over.id);
          return arrayMove(arrayColumns, oldIndex, newIndex)
        })
      }
    }
  }

  const handleDragOver = (event) => {
      console.log(event);
      
  }
  // Chuyển động mượt mà khi thả phần tử
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.5
        }
      }
    })
  }

  // Cấu hình chạm, độ trễ, cho các hành động kéo thả (cả mobile, máy tính)
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { tolerance: 5 } }),
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 500, tolerance: 5 } })
  );
  return (
    <DndContext sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      <Box sx={{
        width: "100%",
        height: theme.appCustom.boardContentHeight,
        display: "flex",
        alignItems: 'center',
        // mt: 2,
        gap: 1,
        px: 1,
        // pt: 1,
        overflowX: 'auto',
        // backgroundColor: "primary.main" 
      }}>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeDragItemId && (
            activeDragItemType === ACTIVE_ITEM_TYLE.COLUMN ?
             <Column column={activeDragItemData} /> : 
             <Card card={activeDragItemData} />
          )}

        </DragOverlay>


        {/* Danh sách các cột */}
        <ListColumns columns={sortedColumn} arrayColumns={arrayColumns} />

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
    </DndContext>
  )
}

export default BoardContent
