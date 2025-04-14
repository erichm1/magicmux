import React, { useEffect, useState } from "react";
import axios from "axios";

const TILE_SIZE = 32;

export default function MapEditor() {
  const [mapData, setMapData] = useState(null);
  const [tileTypes, setTileTypes] = useState([]);
  const [selectedTileType, setSelectedTileType] = useState(null);
  const [newMapSize, setNewMapSize] = useState({ width: 10, height: 10 });

  useEffect(() => {
    axios.get("/api/tile-types/").then((res) => setTileTypes(res.data));
  }, []);

  const updateTile = (x, y) => {
    if (!selectedTileType || !mapData) return;
    const updatedTiles = mapData.tiles.map((tile) => {
      if (tile.x === x && tile.y === y) {
        return { ...tile, tile_type: selectedTileType.id };
      }
      return tile;
    });
    setMapData({ ...mapData, tiles: updatedTiles });
  };

  const saveMap = () => {
    axios.put(`/api/maps/${mapData.id}/`, mapData).then(() => {
      alert("Mapa salvo com sucesso!");
    });
  };

  const createNewMap = () => {
    const tiles = [];
    for (let y = 0; y < newMapSize.height; y++) {
      for (let x = 0; x < newMapSize.width; x++) {
        tiles.push({ x, y, tile_type: tileTypes[0]?.id ?? null });
      }
    }
    const newMap = {
      name: "Novo Mapa",
      width: newMapSize.width,
      height: newMapSize.height,
      tiles
    };
    setMapData(newMap);
  };

  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(e.target.result);
      setMapData(json);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex">
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">Editor de Mapas</h2>

        <div>
          <h3 className="font-semibold mb-1">Criar Novo Mapa</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Largura"
              value={newMapSize.width}
              onChange={(e) => setNewMapSize({ ...newMapSize, width: +e.target.value })}
              className="border px-2 py-1 rounded w-20"
            />
            <input
              type="number"
              placeholder="Altura"
              value={newMapSize.height}
              onChange={(e) => setNewMapSize({ ...newMapSize, height: +e.target.value })}
              className="border px-2 py-1 rounded w-20"
            />
            <button
              onClick={createNewMap}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Criar
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Importar JSON</h3>
          <input type="file" accept=".json" onChange={importFromJSON} />
        </div>

        <div>
          <h3 className="font-semibold mb-1">Selecione o tipo de tile</h3>
          <div className="grid grid-cols-3 gap-2">
            {tileTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedTileType(type)}
                className={`p-2 border rounded text-sm hover:bg-blue-100 ${
                  selectedTileType?.id === type.id ? "bg-blue-200" : ""
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={saveMap}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Salvar Mapa
        </button>
      </div>

      {mapData && (
        <div className="overflow-auto max-w-[80vw] max-h-[90vh] border p-2">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${mapData.width}, ${TILE_SIZE}px)`
            }}
          >
            {mapData.tiles.map((tile, i) => (
              <div
                key={i}
                onClick={() => updateTile(tile.x, tile.y)}
                className="border border-gray-200 w-8 h-8 flex items-center justify-center text-[10px] cursor-pointer hover:bg-gray-100"
                title={`(${tile.x}, ${tile.y})`}
              >
                {tile.tile_type?.toString().slice(0, 1).toUpperCase() || ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
