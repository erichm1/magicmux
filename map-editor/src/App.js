import React, { useState, useEffect } from 'react';
import './App.css';
import TilePalette from './components/TilePalette';
import MapGrid from './components/MapGrid';
import Toolbar from './components/Toolbar';
import { TileProvider } from './context/TileContext';
import MapPreview from './components/MapPreview';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

  // Inside your component
  const [showPreview, setShowPreview] = useState(false);
  const [activePanel, setActivePanel] = useState('preview');
  const [mapName, setMapName] = useState('');
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [tiles, setTiles] = useState([]);
  const [selectedTileType, setSelectedTileType] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [tileData, setTileData] = useState([]);
  const [tileTypes, setTileTypes] = useState([]);

  useEffect(() => {
    const fetchTiles = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8004/api/tile-types/');
        const data = await res.json();
        setTileTypes(data);
        console.info(data);
      } catch (error) {
        console.error('Erro ao carregar os tile types:', error);
      }
    };
    fetchTiles();
  }, []);

  useEffect(() => {
    const fetchMapData = async () => {
      const mapId = 24;
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
        <div className="flex h-screen bg-zinc-950 text-white font-mono text-sm">
          {/* Sidebar */}
          <div className="w-[280px] border-r border-zinc-800 bg-zinc-900 p-4">
            <TilePalette
              tileTypes={tileTypes}
              selectedTileType={selectedTileType}
              setSelectedTileType={setSelectedTileType}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
            <header className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <h1 className="text-xl font-bold uppercase tracking-widest">🗺️ Map Editor</h1>
              <div className="flex gap-2">
                <button className="bg-zinc-800 px-3 py-1 rounded-md hover:bg-zinc-700 transition">💾 Save</button>
                <button className="bg-zinc-800 px-3 py-1 rounded-md hover:bg-zinc-700 transition">📂 Load</button>
                <button className="bg-red-700 px-3 py-1 rounded-md hover:bg-red-600 transition">🧹 Clear</button>
              </div>
            </header>

            {/* Toolbar */}
            <section className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-inner p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
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
              <div className="mt-4 flex gap-2 border-t border-zinc-800 pt-3 flex-wrap">
                {[
                  { label: '🧱 Tiles', key: 'tiles' },
                  { label: '📐 Zones', key: 'zones' },
                  { label: '👾 Monsters', key: 'monsters' },
                  { label: '🗨️ Dialogs', key: 'dialogs' },
                  { label: '⚙️ Layers', key: 'layers' },
                  { label: '🗺️ Preview', key: 'preview' },
                ].map(({ label, key }) => (
                  <button
                    key={key}
                    onClick={() => setActivePanel(key)}
                    className={`px-3 py-1 rounded-md transition border ${activePanel === key ? 'bg-zinc-700 border-zinc-500' : 'bg-zinc-800 hover:bg-zinc-700 border-transparent'
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

            </section>

            {/* Grid */}
            <section className="border border-zinc-800 rounded-lg bg-zinc-900 p-4 shadow-inner">
              <MapGrid
                width={width}
                height={height}
                tiles={tiles}
                setTiles={setTiles}
                selectedTileType={selectedTileType}
              />
            </section>
          </div>

          {/* Preview */}
          <div className="flex flex-col h-full">
            {/* Toggle Button */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-sm font-medium px-3 py-1 mb-2 rounded bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-600 self-end"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>

            {/* Preview Panel */}
            {/* Right-side Panel */}
            <div className="w-[400px] border-l border-zinc-800 bg-zinc-900 p-4 overflow-auto">
              {activePanel === 'preview' && mapData && tileData && (
                <MapPreview
                  key={JSON.stringify(tiles)}
                  width={mapData.width}
                  height={mapData.height}
                  tiles={tileData}
                  tileTypes={tileTypes}
                />
              )}
              {activePanel === 'tiles' && <div>Tiles Coming Soon...</div>}
              {activePanel === 'zones' && <div>Zone Editor Coming Soon...</div>}
              {activePanel === 'monsters' && <div>Monster Config Coming Soon...</div>}
              {activePanel === 'dialogs' && <div>Dialog Editor Coming Soon...</div>}
              {activePanel === 'layers' && <div>Layer Settings Coming Soon...</div>}
            </div>

          </div>

        </div>
      </TileProvider>
    </DndProvider>
  );
}

export default App;
