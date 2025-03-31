export enum MonsterType {
  Goblin = "Goblin",
  Dragon = "Dragon",
  Orc = "Orc",
  Troll = "Troll",
  Skeleton = "Skeleton",
  Werewolf = "Werewolf",
  Vampire = "Vampire",
  Zombie = "Zombie",
  Minotaur = "Minotaur",
  Hydra = "Hydra",
}

export interface Monster {
  id: string;
  name: string;
  type: MonsterType;
  level: number;
  baseHealth: number;
  baseAttack: number;
  baseDefense: number;
  baseXpOnKill: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  xpOnKill: number;
}

// Função para calcular os atributos do monstro com base no nível
export const createMonster = (
  id: string,
  name: string,
  type: MonsterType,
  level: number,
  baseHealth: number,
  baseAttack: number,
  baseDefense: number,
  baseXpOnKill: number
): Monster => ({
  id,
  name,
  type,
  level,
  baseHealth,
  baseAttack,
  baseDefense,
  baseXpOnKill,
  health: baseHealth * level,
  maxHealth: baseHealth * level,
  attack: baseAttack * level,
  defense: baseDefense * level,
  xpOnKill: baseXpOnKill * level,
});


export const monsters: Monster[] = [
  createMonster("1", "Goblin", MonsterType.Goblin, 1, 50, 10, 5, 30000),
  createMonster("2", "Dragon", MonsterType.Dragon, 10, 500, 40, 30, 30000),
  createMonster("3", "Orc", MonsterType.Orc, 5, 150, 25, 15, 30000),
  createMonster("4", "Troll", MonsterType.Troll, 6, 180, 30, 20, 30000),
  createMonster("5", "Skeleton", MonsterType.Skeleton, 3, 70, 15, 10, 30000),
  createMonster("6", "Werewolf", MonsterType.Werewolf, 7, 220, 35, 25, 30000),
  createMonster("7", "Vampire", MonsterType.Vampire, 8, 250, 40, 35, 30000),
  createMonster("8", "Zombie", MonsterType.Zombie, 2, 50, 12, 8, 30000),
  createMonster("9", "Minotaur", MonsterType.Minotaur, 9, 300, 50, 40, 30000),
  createMonster("10", "Hydra", MonsterType.Hydra, 12, 600, 60, 50, 30000),
];
