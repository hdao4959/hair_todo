import Card from './Cards/Card';
import { Box } from '@mui/material';
import { DndContext, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const ListCards = ({ cards }) => {

  const handleDragEndForCard = (event) => {
    console.log(cards);

    // const { active, over } = event;
    // if (!over) {
    //   return
    // }

    // if (active.id !== over.id) {
    //   setArrayColumns((arrayColumns) => {
    //     const oldIndex = arrayColumns.indexOf(active.id)
    //     const newIndex = arrayColumns.indexOf(over.id);
    //     return arrayMove(arrayColumns, oldIndex, newIndex)
    //   })
    // }
  }
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { tolerance: 5 } }),
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 500, tolerance: 5 } })
  );
  return (

    // <DndContext
    //    sensors={sensors}
    //   onDragEnd={handleDragEndForCard}>

      <SortableContext items={cards.map(c => c._id)}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={{
          paddingX: 0.5
        }}>
          {cards.map((card) => {
            return (
              <Card key={card._id} id={card._id} card={card} />

            )
          })}

        </Box>
      </SortableContext>
    // </DndContext>
  )
}

export default ListCards
