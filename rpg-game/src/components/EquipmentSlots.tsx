// src/components/EquipmentSlots.tsx

import React from 'react';
import { Equipment } from '../game/entities/Equipment';

interface EquipmentSlotsProps {
  equipment: Record<string, Equipment | null>;
}

const slotNames = [
  'Capacete',
  'Armadura',
  'Arma',
  'Escudo',
  'Botas',
  'Luvas',
  'Anel',
  'Amuleto',
  'Mochila'
];

const EquipmentSlots: React.FC<EquipmentSlotsProps> = ({ equipment }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
      {slotNames.map((slot) => (
        <div key={slot} style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8 }}>
          <strong>{slot}</strong>
          <div>{equipment[slot]?.name || 'Vazio'}</div>
        </div>
      ))}
    </div>
  );
};

export default EquipmentSlots;
