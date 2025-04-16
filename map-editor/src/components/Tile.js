// src/components/Tile.js
import { useDrag } from 'react-dnd';

const Tile = ({ tile }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tile', // <- esse tipo precisa ser igual ao usado no useDrop!
    item: { tile },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="w-12 h-12 border border-gray-400 cursor-pointer"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img
        src={tile.image.startsWith('http') ? tile.image : `http://127.0.0.1:8004/api/${tile.image}`}
        alt={tile.name}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Tile;
