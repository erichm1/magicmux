// src/game/systems/AttackModifier.ts

export enum AttackModifierType {
    CriticalHit = "Critical Hit", // Chance for 2x damage
    Fire = "Fire", // Burns enemy over time
    Ice = "Ice", // Slows enemy
    Poison = "Poison", // Damage over time
  }
  
  export class AttackModifier {
    type: AttackModifierType;
    effectValue: number; // % chance or effect value
  
    constructor(type: AttackModifierType, effectValue: number) {
      this.type = type;
      this.effectValue = effectValue;
    }
  
    applyModifier(baseDamage: number): number {
      if (this.type === AttackModifierType.CriticalHit && Math.random() < this.effectValue / 100) {
        return baseDamage * 2; // Critical hit doubles damage
      }
      return baseDamage;
    }
  }
  