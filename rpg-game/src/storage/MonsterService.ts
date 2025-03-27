// src/storage/MonsterService.ts
import { Monster, MonsterType } from '../game/entities/Monster';

class MonsterService {
  // Armazenamento em memória (simulação)
  private monsters: Monster[] = [];

  // Carregar todos os monstros
  public async loadMonsters(): Promise<Monster[]> {
    return this.monsters;
  }

  // Criar um novo monstro
  public async createMonster(name: string, type: MonsterType, level: number): Promise<Monster> {
    // Verificação simples para garantir que o nome não está vazio e o tipo seja válido
    if (!name || !Object.values(MonsterType).includes(type)) {
      throw new Error('Nome do monstro ou tipo inválido');
    }

    // Criando um monstro com valores padrão de atributos
    const newMonster: Monster = {
      id: this.generateId(),
      name,
      type,
      level,
      health: level * 10, // Exemplo de cálculo baseado no nível
      attack: level * 2,  // Exemplo de cálculo baseado no nível
      defense: level * 1, // Exemplo de cálculo baseado no nível
    };

    // Adicionando o monstro à lista
    this.monsters.push(newMonster);
    return newMonster;
  }

  // Função para gerar IDs únicos
  private generateId(): string {
    return 'monster-' + Math.random().toString(36).substr(2, 9);
  }
}

// Instância do serviço
const monsterService = new MonsterService();

// Exposição das funções do serviço
export const loadMonsters = async (): Promise<Monster[]> => {
  return monsterService.loadMonsters();
};

export const createMonster = async (name: string, type: MonsterType, level: number): Promise<Monster> => {
  return monsterService.createMonster(name, type, level);
};
