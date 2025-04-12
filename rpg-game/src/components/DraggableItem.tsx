import React from 'react';
import { useDrag } from 'react-dnd';

export const ItemTypes = {
  EQUIPMENT: 'equipment',
};

interface DraggableItemProps {
  item: { name: string }; // Adjust the type based on the actual structure of 'item'
  index: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EQUIPMENT,
    item: { item, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        backgroundColor: 'gray',
        padding: '4px',
        textAlign: 'center',
        borderRadius: '4px',
        border: '1px solid white',
      }}
    >
      {item.name}
    </div>
  );
};

export default DraggableItem;
