// src/components/Toolbar.js
import React, { useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8004/api';

const Toolbar = ({
  mapName,
  setMapName,
  width,
  setWidth,
  height,
  setHeight,
  tiles,
  setTiles,
  selectedTileType,
  setSelectedTileType,
  tileTypes,
  setTileTypes,
}) => {
  useEffect(() => {
    axios.get(`${API_BASE_URL}/tile-types/`).then(res => setTileTypes(res.data));
  }, [setTileTypes]);

  const handleSaveMap = async () => {
    if (!mapName || width <= 0 || height <= 0) return;

    try {
      const mapRes = await axios.post(`${API_BASE_URL}/maps/`, { name: mapName, width, height });
      const mapId = mapRes.data.id;

      const tilesToSave = tiles
        .filter(tile => tile.tileType)
        .map(tile => ({
          x: tile.x,
          y: tile.y,
          tile_type_id: tile.tileType.id,
          map: mapId,
        }));

      await Promise.all(tilesToSave.map(tile => axios.post(`${API_BASE_URL}/map-tiles/`, tile)));

      alert("Mapa salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o mapa:", error);
    }
  };

  const handleGridResize = () => {
    const newTiles = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const existing = tiles.find(t => t.x === x && t.y === y);
        newTiles.push(existing || { x, y, tileType: null });
      }
    }
    setTiles(newTiles);
    console.log(newTiles)
  };

  const handleLoadMap = async (id) => {
    try {
      const map = await axios.get(`${API_BASE_URL}/maps/${id}/`);
      setMapName(map.data.name);
      setWidth(map.data.width);
      setHeight(map.data.height);

      const newTiles = [];
      for (let y = 0; y < map.data.height; y++) {
        for (let x = 0; x < map.data.width; x++) {
          const tileData = map.data.tiles.find(t => t.x === x && t.y === y);
          newTiles.push({
            x,
            y,
            tileType: tileData ? tileData.tile_type : null,
          });
        }
      }
      setTiles(newTiles);
    } catch (err) {
      console.error("Erro ao carregar mapa:", err);
    }
  };

  return (
    <div className="toolbar p-4 border-r w-64">
      <input
        className="w-full p-2 border mb-2"
        placeholder="Map Name"
        value={mapName}
        onChange={(e) => setMapName(e.target.value)}
      />
      <div className="flex gap-2 mb-2">
        <input
          className="w-1/2 p-2 border"
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          placeholder="Largura"
        />
        <input
          className="w-1/2 p-2 border"
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          placeholder="Altura"
        />
      </div>
      <button onClick={handleGridResize} className="w-full bg-yellow-500 text-white p-2 rounded mb-2">resize</button>
      <button onClick={handleSaveMap} className="w-full bg-green-600 text-white p-2 rounded mb-2">save</button>
      <button onClick={() => handleLoadMap(24)} className="w-full bg-blue-500 text-white p-2 rounded mb-4">load</button>

      <div className="font-bold mb-1">Tiles</div>
      <div className="grid grid-cols-3 gap-2">
      {Array.isArray(tileTypes) && tileTypes.map(tile => (
        <div
            key={tile.id}
            className={`cursor-pointer border rounded p-1 ${selectedTileType?.id === tile.id ? 'bg-blue-300' : ''}`}
            onClick={() => setSelectedTileType(tile)}
        >
            <img src={tile.image} alt={tile.name} className="w-full h-12 object-contain" />
            <div className="text-xs text-center">{tile.name}</div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
