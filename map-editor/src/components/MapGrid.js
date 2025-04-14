import { useState } from 'react';
import { useTile } from '../context/TileContext';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

const MapGrid = () => {
  const [grid, setGrid] = useState(
    Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(null))
  );
  const { selectedTile } = useTile();

  const handleClick = (x, y) => {
    if (!selectedTile) return;
    const newGrid = grid.map(row => [...row]);
    newGrid[y][x] = selectedTile;
    setGrid(newGrid);
  };

  return (
    <div className="grid grid-cols-10 gap-0">
      {grid.flatMap((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            onClick={() => handleClick(x, y)}
            className="w-12 h-12 border border-gray-300 bg-white flex items-center justify-center"
          >
            {cell && (
              <img
                src={`http://localhost:8004/${cell.image}`}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MapGrid;
