import React from 'react';

const MapPreview = ({ width, height, tiles, tileTypes }) => {
  // Função para encontrar o tipo de tile pelo ID
  const getTileTypeById = (id) => tileTypes.find(t => t.id === id);

  // Função para obter o tile na posição (x, y)
  const getTileAtPosition = (x, y) =>
    tiles.find(tile => tile.x === x && tile.y === y);

  // Função para renderizar a grid de tiles
  const renderGrid = () => {
    const rows = [];

    for (let y = 0; y < height; y++) {
      const cols = [];

      for (let x = 0; x < width; x++) {
        const tile = getTileAtPosition(x, y);
        const tileType = tile ? getTileTypeById(tile.tile_type_id || tile.tile_type?.id) : null;


        // Cria o elemento de tile
        cols.push(
          <div
            key={`${x}-${y}`}
            style={{
              width: 16,
              height: 16,
              border: '1px solid #ccc',
              backgroundSize: 'cover',
              backgroundImage: tileType?.image
                ? `url(${tileType.image})` // Usando a imagem do tipo de tile
                : 'none',
              backgroundColor: tileType?.image ? 'transparent' : '#f0f0f0',
              display: 'inline-block',
            }}
            title={tileType?.name || 'Vazio'}
          />
        );
      }

      rows.push(
        <div key={y} style={{ display: 'flex' }}>
          {cols}
        </div>
      );
      console.log("MapPreview renderizado", tiles.length, tileTypes.length);
    }

    return rows;
    
  };

  return (
    <div>
      <h2>Visualização do Mapa</h2>
      <div style={{ border: '1px solid #999', padding: 4 }}>
        {renderGrid()} {/* Renderiza a grade do mapa no preview */}
      </div>
    </div>
  );
};

export default MapPreview;
