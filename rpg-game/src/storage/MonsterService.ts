import { Monster, MonsterType } from '../game/entities/Monster';

class MonsterService {
  private monsters: Monster[] = [];

  public async loadMonsters(): Promise<Monster[]> {
    return this.monsters;
  }

  public async createMonster(name: string, type: MonsterType, level: number): Promise<Monster> {
    if (!name || !Object.values(MonsterType).includes(type)) {
      throw new Error('Invalid monster name or type');
    }

    const baseHealth = 50;
    const baseAttack = 10;
    const baseDefense = 5;
    const baseXpOnKill = 100;

    const newMonster: Monster = {
      id: this.generateId(),
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
    };

    this.monsters.push(newMonster);
    return newMonster;
  }

  public async updateMonster(id: string, name: string, type: MonsterType, level: number): Promise<Monster> {
    const monsterIndex = this.monsters.findIndex((monster) => monster.id === id);
    if (monsterIndex === -1) {
      throw new Error('Monster not found');
    }

    const baseHealth = 50;
    const baseAttack = 10;
    const baseDefense = 5;
    const baseXpOnKill = 100;

    const updatedMonster: Monster = {
      ...this.monsters[monsterIndex],
      name,
      type,
      level,
      health: baseHealth * level,
      maxHealth: baseHealth * level,
      attack: baseAttack * level,
      defense: baseDefense * level,
      xpOnKill: baseXpOnKill * level,
      baseHealth,
      baseAttack,
      baseDefense,
      baseXpOnKill,
    };

    this.monsters[monsterIndex] = updatedMonster;
    return updatedMonster;
  }

  // Função para criar monstros aleatórios
  public async createRandomMonster(level: number): Promise<Monster> {
    const randomName = this.generateRandomName();
    const randomType = this.getRandomMonsterType();
    
    // Base stats that could change based on the monster's type
    const baseHealth = Math.floor(Math.random() * (100 - 50 + 1) + 50); // Health between 50 and 100
    const baseAttack = Math.floor(Math.random() * (20 - 10 + 1) + 10); // Attack between 10 and 20
    const baseDefense = Math.floor(Math.random() * (10 - 5 + 1) + 5); // Defense between 5 and 10
    const baseXpOnKill = Math.floor(Math.random() * (200 - 100 + 1) + 100); // XP between 100 and 200

    const newMonster: Monster = {
      id: this.generateId(),
      name: randomName,
      type: randomType,
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
    };

    this.monsters.push(newMonster);
    return newMonster;
  }

  private generateId(): string {
    return 'monster-' + Math.random().toString(36).slice(2, 11);
  }

  private generateRandomName(): string {
    const names = ['Goblin', 'Orc', 'Troll', 'Dragon', 'Slime', 'Vampire'];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }

  private getRandomMonsterType(): MonsterType {
    const types = Object.values(MonsterType);
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }
}

const monsterService = new MonsterService();

export const loadMonsters = async (): Promise<Monster[]> => {
  return monsterService.loadMonsters();
};

export const createMonster = async (name: string, type: MonsterType, level: number): Promise<Monster> => {
  return monsterService.createMonster(name, type, level);
};

export const createRandomMonster = async (level: number): Promise<Monster> => {
  return monsterService.createRandomMonster(level);
};

export const updateMonster = async (id: string, name: string, type: MonsterType, level: number): Promise<Monster> => {
  return monsterService.updateMonster(id, name, type, level);
};
