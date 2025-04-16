import { useEffect, useState } from 'react';
import api from '../api/api';
import { useTile } from '../context/TileContext';
import { useDrag } from 'react-dnd';

const API_BASE_URL = 'http://127.0.0.1:8004/api';

const DraggableTile = ({ tile, selectedTile, setSelectedTile }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tile',
    item: { tile: { ...tile } }, 
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      key={tile.id}
      className={`cursor-pointer mb-2 p-1 rounded ${
        selectedTile?.id === tile.id ? 'bg-blue-300' : 'hover:bg-gray-300'
      } ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => setSelectedTile(tile)}
    >
      <img
        src={tile.image.startsWith('http') ? tile.image : `http://127.0.0.1:8004${tile.image}`}
        alt={tile.name}
        className="w-full"
      />
      <div className="text-center text-sm">{tile.name}</div>
    </div>
  );
};

const TilePalette = () => {
  const [tiles, setTiles] = useState([]);
  const { selectedTile, setSelectedTile } = useTile();

  useEffect(() => {
    api.get(`${API_BASE_URL}/tile-types/`).then(res => setTiles(res.data));
  }, []);

  return (
    <div className="p-2 border-r w-40 bg-gray-100 overflow-y-auto">
      <h2 className="text-lg font-bold mb-2">Tiles</h2>
      {tiles.map(tile => (
        <DraggableTile
          key={tile.id}
          tile={tile}
          selectedTile={selectedTile}
          setSelectedTile={setSelectedTile}
        />
      ))}
    </div>
  );
};

export default TilePalette;
