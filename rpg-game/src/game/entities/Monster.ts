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

  Hellhound = "Hellhound",
  Spectre = "Spectre",
  PhantomAssassin = "Phantom Assassin",
  Demon = "Demon",
  DemonLord = "Demon Lord",
  DemonLieutenant = "Demon Lieutenant"
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
  xpOnKill: baseXpOnKill * level * 50,
});


export const monsters: Monster[] = [
    // id - nome - tipo - level - baseHealth - baseAttack - baseDefense - baseXpOnKill
    createMonster("1", "Goblin", MonsterType.Goblin, 100, 50, 300, 5, 30000),
    createMonster("2", "Dragon", MonsterType.Dragon, 10, 500, 40, 30, 30000),
    createMonster("3", "Orc", MonsterType.Orc, 5, 150, 25, 15, 30000),
    createMonster("4", "Troll", MonsterType.Troll, 6, 180, 30, 20, 30000),
    createMonster("5", "Skeleton", MonsterType.Skeleton, 3, 70, 15, 10, 30000),
    createMonster("6", "Werewolf", MonsterType.Werewolf, 7, 220, 35, 25, 30000),
    createMonster("7", "Vampire", MonsterType.Vampire, 8, 250, 40, 35, 30000),
    createMonster("8", "Zombie", MonsterType.Zombie, 2, 50, 12, 8, 30000),
    createMonster("9", "Minotaur", MonsterType.Minotaur, 9, 300, 50, 40, 30000),
    createMonster("10", "Hydra", MonsterType.Hydra, 12, 600, 60, 50, 30000),
    createMonster("11", "Hellhound", MonsterType.Hellhound, 12, 800, 70, 60, 30000),
    createMonster("12", "Spectre", MonsterType.Spectre, 12, 900, 80, 70, 30000),
  
    // 👇 Monstros extremamente OP 👇
    createMonster("13", "Phantom Assassin", MonsterType.PhantomAssassin, 12, 5000, 300, 200, 100000),
    createMonster("14", "Demon", MonsterType.Demon, 12, 10000, 400, 300, 150000),
    createMonster("15", "Demon Lord", MonsterType.DemonLord, 12, 20000, 600, 500, 300000),
    createMonster("16", "Demon Lieutenant", MonsterType.DemonLieutenant, 12, 15000, 500, 450, 250000),
]