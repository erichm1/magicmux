import { useDrag } from 'react-dnd';

const TileItem = ({ tile }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tile',
    item: { tile: { ...tile } }, // clone evita sobrescrever referência
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`w-12 h-12 border ${isDragging ? 'opacity-50' : ''}`}
    >
      <img
        src={`http://127.0.0.1:8004/api/${tile.image}`}
        alt={tile.name}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default TileItem;
