import { useEffect, useState } from 'react';
import api from '../api/api';
import { useTile } from '../context/TileContext';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';

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
      className={clsx(
        'rounded-lg p-1 transition-all duration-200 cursor-pointer border-2',
        isDragging && 'opacity-50',
        selectedTile?.id === tile.id
          ? 'border-blue-500 bg-zinc-800'
          : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800'
      )}
      onClick={() => setSelectedTile(tile)}
    >
      <img
        src={tile.image.startsWith('http') ? tile.image : `http://127.0.0.1:8004${tile.image}`}
        alt={tile.name}
        className="w-full h-12 object-contain"
      />
      <div className="text-xs text-center mt-1 text-zinc-200 truncate">{tile.name}</div>
    </div>
  );
};

const TilePalette = () => {
  const [tiles, setTiles] = useState([]);
  const { selectedTile, setSelectedTile } = useTile();

  useEffect(() => {
    api.get(`${API_BASE_URL}/tile-types/`).then((res) => setTiles(res.data));
  }, []);

  return (
    <div className="w-48 bg-zinc-950 p-3 border-r border-zinc-800 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
      <h2 className="text-md font-bold uppercase tracking-wider mb-3">🎨 Tiles</h2>
      <div className="grid grid-cols-2 gap-3">
        {tiles.map((tile) => (
          <DraggableTile
            key={tile.id}
            tile={tile}
            selectedTile={selectedTile}
            setSelectedTile={setSelectedTile}
          />
        ))}
      </div>
    </div>
  );
};

export default TilePalette;
