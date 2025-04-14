import React, { useState } from 'react';
import './App.css';
import TilePalette from './components/TilePalette';
import MapGrid from './components/MapGrid';
import Toolbar from './components/Toolbar';
import { TileProvider } from './context/TileContext';

function App() {
  const [mapName, setMapName] = useState('');
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [tiles, setTiles] = useState([]);
  const [selectedTileType, setSelectedTileType] = useState(null);
  const [tileTypes, setTileTypes] = useState([]);

  return (
    <TileProvider>
      <div className="flex h-screen">
        <TilePalette />
        <div className="flex-1 p-4 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Editor de Mapas</h1>
          <MapGrid />
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
      </div>
    </TileProvider>
  );
}

export default App;
