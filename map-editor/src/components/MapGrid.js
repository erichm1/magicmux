import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

const MAP_ID = 24;

const MapGrid = ({ onGridUpdate }) => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [tiles, setTiles] = useState(new Map());
  const [modifiedTiles, setModifiedTiles] = useState(new Map());
  const [deleteMode, setDeleteMode] = useState(false);

  const increaseWidth = () => setWidth(prev => prev + 1);
  const increaseHeight = () => setHeight(prev => prev + 1);
  const decreaseWidth = () => setWidth(prev => prev - 1);
  const decreaseHeight = () => setHeight(prev => prev - 1);
  
  useEffect(() => {
    const fetchMapData = async () => {
      const mapRes = await fetch(`http://127.0.0.1:8004/api/maps/${MAP_ID}/`);
      const mapData = await mapRes.json();

      const tilesRes = await fetch(`http://127.0.0.1:8004/api/map-tiles/?map=${MAP_ID}`);
      const tileData = await tilesRes.json();

      setWidth(mapData.width);
      setHeight(mapData.height);

      const tileMap = new Map();
      tileData.forEach(tile => {
        tileMap.set(`${tile.x},${tile.y}`, {
          id: tile.id,
          x: tile.x,
          y: tile.y,
          map: MAP_ID,
          tile_type: tile.tile_type,
          tile_type_id: tile.tile_type.id,
        });
      });

      setTiles(tileMap);
    };

    fetchMapData();
  }, []);

  const handleDrop = (x, y, tileType) => {
    const key = `${x},${y}`;
    const existingTile = tiles.get(key);

    const updatedTile = deleteMode
      ? null  // Apaga o tile
      : {
          id: existingTile?.id,
          x,
          y,
          map: MAP_ID,
          tile_type_id: tileType.id,
          tile_type: tileType,
        };

    if (updatedTile === null) {
      setModifiedTiles(prev => {
        const newModifiedTiles = new Map(prev);
        newModifiedTiles.delete(key);  // Remove do mapa modificado
        return newModifiedTiles;
      });
    } else {
      setModifiedTiles(prev => new Map(prev.set(key, updatedTile)));  // Atualiza o tile modificado
    }

    setTiles(prev => new Map(prev.set(key, updatedTile)));  // Atualiza o estado dos tiles
  };

  const saveTiles = async () => {
    const payload = Array.from(modifiedTiles.values()).map(tile => ({
      ...(tile.id ? { id: tile.id } : {}),
      x: tile.x,
      y: tile.y,
      map: tile.map,
      tile_type_id: tile.tile_type_id,
    }));

    const res = await fetch('http://127.0.0.1:8004/api/map-tiles/bulk-save/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('Mapa salvo com sucesso!');
    } else {
      alert('Erro ao salvar mapa!');
    }
  };

  return (
    <div>
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${width}, 48px)`,
          gridTemplateRows: `repeat(${height}, 48px)`,
          display: 'grid',
        }}
      >
        {Array.from({ length: height }).map((_, y) =>
          Array.from({ length: width }).map((_, x) => {
            const tile = tiles.get(`${x},${y}`);
            return (
              <TileDropCell
                key={`${x}-${y}`}
                x={x}
                y={y}
                tile={tile?.tile_type}
                onDropTile={(t) => handleDrop(x, y, t)}
              />
            );
          })
        )}
      </div>
      <div className="mt-8 flex">
        <button onClick={increaseWidth} className="mr-2 p-2 bg-blue-500 text-white rounded">
          + C
        </button>
        <button onClick={decreaseWidth} className="mr-2 p-2 bg-blue-500 text-white rounded">
          - C
        </button>
        <button onClick={increaseHeight} className="mr-2 p-2 bg-blue-500 text-white rounded">
          + R
        </button>
        <button onClick={decreaseHeight} className="mr-2 p-2 bg-blue-500 text-white rounded">
          - R
        </button>
      </div>
      {/* Controles */}
      <div className="mt-8 flex gap-2 flex-wrap">
        <button onClick={() => setDeleteMode(!deleteMode)} className="p-2 bg-red-600 text-white rounded">
          {deleteMode ? '🧹 Modo Apagar (ativo)' : 'Ativar modo apagar'}
        </button>
        <button onClick={saveTiles} className="p-2 bg-green-600 text-white rounded">Salvar</button>
      </div>
    </div>
  );
};

const TileDropCell = ({ x, y, tile, onDropTile }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'tile',
    drop: (item) => onDropTile(item.tile),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-12 h-12 border border-gray-300 flex items-center justify-center ${
        isOver ? 'bg-blue-100' : 'bg-white'
      }`}
    >
      {tile ? (
        <img
          src={tile.image?.startsWith('http') ? tile.image : `http://127.0.0.1:8004/${tile.image}`}
          alt={tile.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200"></div> // Placeholder para células vazias
      )}
    </div>
  );
};

export default MapGrid;
