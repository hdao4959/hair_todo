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
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core';
import {
  arrayMove,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import Column from './ListColumns/Columns/Column';
import { clone, cloneDeep } from 'lodash';

const BoardContent = () => {
  const { board } = mockData;
  // state cho mảng các column được sắp xếp theo trình tự của db
  const [sortedColumn, setSortedColumn] = useState([]);


  const [arrayColumns, setArrayColumns] = useState(board?.columnOrderIds);
  useEffect(() => {
    setSortedColumn(sortedArray(board?.columns, board?.columnOrderIds, '_id'))
  }, [board]);

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [tempColumnDataWhenDragCard, setTempColumnDataWhenDragCard] = useState(null);
  const ACTIVE_ITEM_TYLE = {
    COLUMN: 'COLUMN',
    CARD: 'CARD'
  }

  // Hàm tìm kiếm column chứa card bằng id card
  const findColumnWhenDragCard = (cardId) => {
    return sortedColumn.find(column => column.cards.map(card => {
      return card._id
    }).includes(cardId));
  }

  // Xử lí khi bắt đầu kéo phần tử
  const handleDragStart = (event) => {
    const { active } = event;
    if (active?.data?.current?.columnId) {
      setTempColumnDataWhenDragCard(findColumnWhenDragCard(active?.data?.current?._id))
    }

    setActiveDragItemId(active?.id);
    setActiveDragItemType(active?.data?.current?.columnId ?
      ACTIVE_ITEM_TYLE.CARD : ACTIVE_ITEM_TYLE.COLUMN);
    setActiveDragItemData(active?.data?.current);
  }

  const handleDragEnd = (event) => {

    const { active, over } = event;
    if (!over || !active) return

    // Trường hợp kéo card
    if (activeDragItemType === ACTIVE_ITEM_TYLE.CARD) {


      const activeData = active?.data?.current;
      const overData = over?.data?.current;
      // không có điểm bắt đầu và điểm kết thúc thì không làm gì cả
      if (!activeData || !overData) return;


      const activeCardId = active.id;
      const overCardId = over.id;
      const activeCardData = active.data.current;
      const overCardData = over.data.current;
      const overColumnData = findColumnWhenDragCard(overCardId)


      if (tempColumnDataWhenDragCard._id !== overColumnData._id) {
        console.log('Kéo sang column khác')

      } else {

        
          const oldIndex = tempColumnDataWhenDragCard?.cards?.findIndex(c => c._id === activeDragItemId)
          const newIndex = tempColumnDataWhenDragCard?.cards?.findIndex(c => c._id === overCardId);
       
          const dndSortedCards = arrayMove(tempColumnDataWhenDragCard?.cards, oldIndex, newIndex);

          setSortedColumn(prevSortedColumns => {
            const cloneColumn = cloneDeep(prevSortedColumns) 

            const targetColumn = cloneColumn.find(c => c._id === overColumnData._id);
            targetColumn.cards = dndSortedCards
            targetColumn.cardOrderIds = dndSortedCards.map(card => card._id);
            return cloneColumn
          })
        
         

      }
     

      return
    }

    // Trường hợp kéo column 
    if (activeDragItemType === ACTIVE_ITEM_TYLE.COLUMN && active?.id !== over?.id) {
      // set lại mảng id column để render columns theo trình tự
      setArrayColumns((arrayColumns) => {
        const oldIndex = arrayColumns.indexOf(active.id)
        const newIndex = arrayColumns.indexOf(over.id);
        return arrayMove(arrayColumns, oldIndex, newIndex)
      })
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setTempColumnDataWhenDragCard(null)

  }

  const handleDragOver = (event) => {
    const { active, over } = event;


    const activeData = active?.data?.current;
    const overData = over?.data?.current;
    // không có điểm bắt đầu và điểm kết thúc thì không làm gì cả
    if (!activeData || !overData) return;


    const activeCardId = active.id;
    const overCardId = over.id;
    const activeCardData = active.data.current;
    const overCardData = over.data.current;


    // Kéo column thì không làm gì cả
    if (activeDragItemType === ACTIVE_ITEM_TYLE.COLUMN) return

    const activeColumnData = findColumnWhenDragCard(activeCardId);
    const overColumnData = findColumnWhenDragCard(overCardId);


    if (!activeColumnData || !overColumnData) return

    if (activeColumnData._id !== overColumnData._id) {
      setSortedColumn(prevSortedColumns => {
        const overCardIndex = overColumnData.cards.findIndex(card => card._id === overCardId)

        let newCardIndex;
        // Kiểm tra xem phần thử đang kéo có đang nằm dưới phần tử card của column hay không
        const isBelowOverItem =
          overCardId &&
          active.rect.current.translated &&
          active.rect.current.translated.top >
          over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumnData?.cards?.length + 1;
        const newSortedColumns = cloneDeep(prevSortedColumns)
        //Lấy ra dữ liệu của column chứa phần tử được kéo
        const updateActiveColumn = newSortedColumns.find(column => column._id === activeColumnData._id)
        // Lấy ra dữ liệu của column mà phần tử được kéo tới
        const updateOverColumn = newSortedColumns.find(column => column._id === overColumnData._id)

        // Nếu có column chứa phần tử đc kéo, update lại danh sách card (loại bỏ card vừa kéo ra khỏi column)
        if (updateActiveColumn) {
          updateActiveColumn.cards = updateActiveColumn.cards.filter(card => card._id !== activeCardId)
          updateActiveColumn.cardOrderIds = updateActiveColumn.cards.map(card => card._id)
        }
        // Nếu có column mà phần tử được kéo đến, thêm card vừa được kéo vào column, update lại số lượng card
        if (updateOverColumn) {
          updateOverColumn.cards = updateOverColumn.cards.filter(card => card._id !== activeCardId)
          updateOverColumn.cards = updateOverColumn.cards.toSpliced(activeCardId, 0, activeCardData)
          updateOverColumn.cardOrderIds = updateOverColumn.cards.map(card => card._id)

        }
        // trả về mảng column mới sau khi kéo xong
        return newSortedColumns
      })
    };

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
      collisionDetection={closestCorners}
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
