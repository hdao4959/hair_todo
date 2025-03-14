import Column from './Columns/Column';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  arrayMove,
  SortableContext,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';




const ListColumns = ({ columns }) => {
  const [arrayColumns, setArrayColumns] = useState([]);

  useEffect(() => {
    if (columns?.length) {
      setArrayColumns(columns.map(column => column._id))

    }
  }, [columns])


  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setArrayColumns((arrayColumns) => {
        const oldIndex = arrayColumns.indexOf(active.id)
        const newIndex = arrayColumns.indexOf(over.id);
        return arrayMove(arrayColumns, oldIndex, newIndex)

      })
    }


  }
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { tolerance: 10 } }),  // Dùng cho máy tính
    useSensor(TouchSensor, { activationConstraint: { tolerance: 10 } })   // Dùng cho điện thoại 
  );
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={arrayColumns}
        strategy={horizontalListSortingStrategy}>

        {arrayColumns?.map((column_id) => {
          const column = columns.find(c => c._id == column_id);
          return column ? < Column key={column._id} column={column} /> : null;
        })}
      </SortableContext>

    </DndContext>
  )
}

export default ListColumns
