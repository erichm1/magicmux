import { useEffect, useState } from 'react';
import api from '../api/api';
import { useTile } from '../context/TileContext';

const TilePalette = () => {
  const [tiles, setTiles] = useState([]);
  const { selectedTile, setSelectedTile } = useTile();

  useEffect(() => {
    api.get('/tile-types/').then(res => setTiles(res.data));
  }, []);

  return (
    <div className="p-2 border-r w-40 bg-gray-100 overflow-y-auto">
      <h2 className="text-lg font-bold mb-2">Tiles</h2>
      {tiles.map(tile => (
        <div
          key={tile.id}
          className={`cursor-pointer mb-2 p-1 rounded ${
            selectedTile?.id === tile.id ? 'bg-blue-300' : 'hover:bg-gray-300'
          }`}
          onClick={() => setSelectedTile(tile)}
        >
          <img src={`http://localhost:8004${tile.image}`} alt={tile.name} className="w-full" />
          <div className="text-center text-sm">{tile.name}</div>
        </div>
      ))}
    </div>
  );
};

export default TilePalette;
