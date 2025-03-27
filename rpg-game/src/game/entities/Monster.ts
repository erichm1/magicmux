// src/game/entities/Monster.ts

export interface Monster {
  id: string;
  name: string;
  type: MonsterType;
  level: number;
  health: number;
  attack: number;
  defense: number;
  xpOnKill: number;
}

// Enum to define monster types
export enum MonsterType {
  Goblin = 'Goblin',
  Dragon = 'Dragon',
  Orc = 'Orc',
  Troll = 'Troll',
  Skeleton = 'Skeleton',
  Werewolf = 'Werewolf',
  Vampire = 'Vampire',
  Zombie = 'Zombie',
  Minotaur = 'Minotaur',
  Hydra = 'Hydra',
  Cyclops = 'Cyclops',
  GiantSpider = 'Giant Spider',
  Bat = 'Bat',
  Ghoul = 'Ghoul',
  Wraith = 'Wraith',
  Mummy = 'Mummy',
  Kraken = 'Kraken',
  Phoenix = 'Phoenix',
  Chimera = 'Chimera',
  Banshee = 'Banshee'
}

// List of monsters with their attributes
export const monsters: Monster[] = [
  { id: '1', name: 'Goblin', type: MonsterType.Goblin, level: 1, health: 50, attack: 10, defense: 5, xpOnKill: 3000 },
  { id: '2', name: 'Dragon', type: MonsterType.Dragon, level: 10, health: 500, attack: 40, defense: 30, xpOnKill: 3000 },
  { id: '3', name: 'Orc', type: MonsterType.Orc, level: 5, health: 150, attack: 25, defense: 15, xpOnKill: 3000 },
  { id: '4', name: 'Troll', type: MonsterType.Troll, level: 6, health: 180, attack: 30, defense: 20, xpOnKill: 3000 },
  { id: '5', name: 'Skeleton', type: MonsterType.Skeleton, level: 3, health: 70, attack: 15, defense: 10, xpOnKill: 3000 },
  { id: '6', name: 'Werewolf', type: MonsterType.Werewolf, level: 7, health: 220, attack: 35, defense: 25, xpOnKill: 3000 },
  { id: '7', name: 'Vampire', type: MonsterType.Vampire, level: 8, health: 250, attack: 40, defense: 35, xpOnKill: 3000 },
  { id: '8', name: 'Zombie', type: MonsterType.Zombie, level: 2, health: 50, attack: 12, defense: 8, xpOnKill: 3000 },
  { id: '9', name: 'Minotaur', type: MonsterType.Minotaur, level: 9, health: 300, attack: 50, defense: 40, xpOnKill: 3000 },
  { id: '10', name: 'Hydra', type: MonsterType.Hydra, level: 12, health: 600, attack: 60, defense: 50, xpOnKill: 3000 },
  { id: '11', name: 'Cyclops', type: MonsterType.Cyclops, level: 10, health: 400, attack: 45, defense: 35, xpOnKill: 3000 },
  { id: '12', name: 'Giant Spider', type: MonsterType.GiantSpider, level: 4, health: 90, attack: 20, defense: 12, xpOnKill: 3000 },
  { id: '13', name: 'Bat', type: MonsterType.Bat, level: 1, health: 30, attack: 5, defense: 3, xpOnKill: 5 },
  { id: '14', name: 'Ghoul', type: MonsterType.Ghoul, level: 6, health: 170, attack: 28, defense: 18, xpOnKill: 60 },
  { id: '15', name: 'Wraith', type: MonsterType.Wraith, level: 7, health: 200, attack: 38, defense: 30, xpOnKill: 75 },
  { id: '16', name: 'Mummy', type: MonsterType.Mummy, level: 5, health: 140, attack: 22, defense: 14, xpOnKill: 40 },
  { id: '17', name: 'Kraken', type: MonsterType.Kraken, level: 15, health: 800, attack: 70, defense: 60, xpOnKill: 500 },
  { id: '18', name: 'Phoenix', type: MonsterType.Phoenix, level: 14, health: 700, attack: 65, defense: 55, xpOnKill: 450 },
  { id: '19', name: 'Chimera', type: MonsterType.Chimera, level: 13, health: 650, attack: 60, defense: 50, xpOnKill: 400 },
  { id: '20', name: 'Banshee', type: MonsterType.Banshee, level: 8, health: 230, attack: 38, defense: 28, xpOnKill: 85 }
];
