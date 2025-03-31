// src/game/systems/BaseStats.ts

export class BaseStats {
  strength: number;
  agility: number;
  intelligence: number;
  vitality: number;
  attackPower: number;
  defense: number;
  lifeRegen: number;
  manaRegen: number;

  constructor(strength: number, agility: number, intelligence: number, vitality: number, attackPower: number, defense: number, lifeRegen: number, manaRegen: number) {
    this.strength = strength;
    this.agility = agility;
    this.intelligence = intelligence;
    this.vitality = vitality;
    this.attackPower = attackPower;
    this.defense = defense;
    this.lifeRegen = lifeRegen;
    this.manaRegen = manaRegen;
  }

  applyGemModifier(stat: string, value: number) {
    switch (stat) {
      case 'strength':
        this.strength += value;
        break;
      case 'agility':
        this.agility += value;
        break;
      case 'intelligence':
        this.intelligence += value;
        break;
      case 'vitality':
        this.vitality += value;
        break;
      case 'attackPower':
        this.attackPower += value;
        break;
      case 'defense':
        this.defense += value;
        break;
      case 'lifeRegen':
        this.lifeRegen += value;
        break;
      case 'manaRegen':
        this.manaRegen += value;
        break;
    }
  }

  applySkillTreeModifier(stat: string, value: number) {
    switch (stat) {
      case 'strength':
        this.strength += value;
        break;
      case 'agility':
        this.agility += value;
        break;
      case 'intelligence':
        this.intelligence += value;
        break;
      case 'vitality':
        this.vitality += value;
        break;
      case 'attackPower':
        this.attackPower += value;
        break;
      case 'defense':
        this.defense += value;
        break;
      case 'lifeRegen':
        this.lifeRegen += value;
        break;
      case 'manaRegen':
        this.manaRegen += value;
        break;
    }
  }

  calculateStats(characterLevel: number) {
    const stats = {
      strength: this.strength,
      agility: this.agility,
      intelligence: this.intelligence,
      vitality: this.vitality,
      attackPower: this.attackPower,
      defense: this.defense,
      lifeRegen: this.lifeRegen,
      manaRegen: this.manaRegen,
    };

    // Apply skill tree modifiers if character level is 250 or higher
    if (characterLevel >= 250) {
      // TO DO: implement skill tree modifiers
    }

    return stats;
  }
}