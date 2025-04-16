import React, { useState, useEffect } from 'react'; // ⬅️ ADICIONADO useEffect
import './App.css';
import TilePalette from './components/TilePalette';
import MapGrid from './components/MapGrid';
import Toolbar from './components/Toolbar';
import { TileProvider } from './context/TileContext';
import MapPreview from './components/MapPreview';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [mapName, setMapName] = useState('');
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [tiles, setTiles] = useState([]);
  const [selectedTileType, setSelectedTileType] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [tileData, setTileData] = useState([]);
  const [tileTypes, setTileTypes] = useState([]);

  // ⬇️ FETCH tileTypes da API
  useEffect(() => {
    const fetchTiles = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8004/api/tile-types/');
        const data = await res.json();
        setTileTypes(data);
        console.info(data)
      } catch (error) {
        console.error('Erro ao carregar os tile types:', error);
      }
    };

    fetchTiles();
  }, []);

  // Fetch map data and tile data when mapId changes
  useEffect(() => {
    const fetchMapData = async () => {
      const mapId = 24; // Pode ser dinâmico futuramente
      const mapRes = await fetch(`http://127.0.0.1:8004/api/maps/${mapId}/`);
      const mapData = await mapRes.json();
      setMapData(mapData);
      
      const tilesRes = await fetch(`http://127.0.0.1:8004/api/map-tiles/?map=${mapId}`);
      const tileData = await tilesRes.json();
      setTileData(tileData);
    };

    fetchMapData();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <TileProvider>
        <div className="flex h-screen">
          <TilePalette tileTypes={tileTypes} selectedTileType={selectedTileType} setSelectedTileType={setSelectedTileType} />
          <div className="flex-1 p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Map Editor</h1>
            <MapGrid
              width={width}
              height={height}
              tiles={tiles}
              setTiles={setTiles}
              selectedTileType={selectedTileType}
            />
            <Toolbar
              mapName={mapName}
              setMapName={setMapName}
              width={width}
              setWidth={setWidth}
              height={height}
              setHeight={setHeight}
              tiles={tiles}
              setTiles={setTiles}
              selectedTileType={selectedTileType}
              setSelectedTileType={setSelectedTileType}
              tileTypes={tileTypes}
              setTileTypes={setTileTypes}
            />
          </div>
          <div className="w-[400px] p-4 overflow-auto border-l border-gray-300">
          {mapData && tileData && (
            <MapPreview
              key={JSON.stringify(tiles)} // força recriação quando tiles mudam
              width={mapData.width} // Usando o width do mapa diretamente
              height={mapData.height}
              tiles={tileData}
              tileTypes={tileTypes}
            />
          )}
        </div>

        </div>
      </TileProvider>
    </DndProvider>
  );
}

export default App;
