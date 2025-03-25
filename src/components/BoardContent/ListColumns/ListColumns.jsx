import Column from './Columns/Column';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

const ListColumns = ({ columns, arrayColumns }) => {
  
  // state cho mảng các column được sắp xếp theo trình tự của db
  const [arrayColumnIds, setArrayColumnIds] = useState(arrayColumns);

  // Trường hợp trật tự các column thay đổi đc truyền từ prop cha xuống -> set lại thứ tự sắp xếp của các column
  useEffect(() => {
    if (columns?.length) {
      setArrayColumnIds(arrayColumns)
    }
  }, arrayColumns)

  return (

    <SortableContext items={arrayColumnIds}
      strategy={horizontalListSortingStrategy}>

      {arrayColumnIds?.map((column_id) => {
        const column = columns.find(c => c._id == column_id);
        return column ?
          < Column key={column._id} column={column} />

          : null;
      })}
    </SortableContext>

  )
}

export default ListColumns
