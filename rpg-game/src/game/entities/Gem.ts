// src/game/entities/Gem.ts

export enum GemType {
    Power = "Power", // Increases damage
    Speed = "Speed", // Reduces cooldown
    ManaEfficiency = "Mana Efficiency", // Reduces mana cost
    Lifesteal = "Lifesteal", // Heals based on damage dealt
  }
  
  export class Gem {
    type: GemType;
    effectValue: number; // Percentage-based effect (e.g., +10% damage)
  
    constructor(type: GemType, effectValue: number) {
      this.type = type;
      this.effectValue = effectValue;
    }
  }
  