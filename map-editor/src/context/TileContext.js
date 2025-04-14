import { createContext, useState, useContext } from 'react';

const TileContext = createContext();

export const TileProvider = ({ children }) => {
  const [selectedTile, setSelectedTile] = useState(null);

  return (
    <TileContext.Provider value={{ selectedTile, setSelectedTile }}>
      {children}
    </TileContext.Provider>
  );
};

export const useTile = () => useContext(TileContext);
