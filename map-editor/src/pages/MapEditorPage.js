import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MapGrid from '../components/MapGrid';

const TilePalette = ({ tiles }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded">
      {tiles.map((tile) => (
        <div
          key={tile.id}
          draggable
          className="w-12 h-12 border border-gray-400 rounded overflow-hidden cursor-move"
          onDragStart={(e) =>
            e.dataTransfer.setData('application/json', JSON.stringify({ tile }))
          }
        >
          <img
            src={
              tile.image?.startsWith('http')
                ? tile.image
                : `http://127.0.0.1:8004/${tile.image}`
            }
            alt={tile.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

const MapEditorPage = () => {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    const fetchTiles = async () => {
      const res = await fetch('http://127.0.0.1:8004/api/tile-types/');
      const data = await res.json();
      setTiles(data);
    };

    fetchTiles();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Editor de Mapas</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Tiles Disponíveis:</h2>
          <TilePalette tiles={tiles} />
        </div>

        <div className="border p-4 rounded bg-white shadow">
          <MapGrid />
        </div>
      </div>
    </DndProvider>
  );
};

export default MapEditorPage;
