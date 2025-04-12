import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './DraggableItem';

interface DroppableSlotProps {
  slotName: string;
  onDrop: (slotName: string, item: any) => void;
  currentItem?: { name: string }; // Added currentItem with proper type
}

const DroppableSlot: React.FC<DroppableSlotProps> = ({ slotName, onDrop, currentItem }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.EQUIPMENT,
    drop: (draggedItem: { item: any }) => onDrop(slotName, draggedItem.item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }), 
  }));

  return (
    <div
      ref={drop}
      style={{
        minHeight: '60px',
        border: '2px dashed white',
        padding: '8px',
        backgroundColor: isOver ? '#444' : '#222',
        borderRadius: '5px',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <div><strong>{slotName}</strong></div>
      <div>{currentItem ? currentItem.name : 'Vazio'}</div>
    </div>
  );
};

export default DroppableSlot;
