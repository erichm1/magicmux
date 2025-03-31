// src/game/entities/Gem.ts

export enum GemType {
  Power = "Power", // Increases damage
  Speed = "Speed", // Reduces cooldown
  ManaEfficiency = "Mana Efficiency", // Reduces mana cost
  Lifesteal = "Lifesteal", // Heals based on damage dealt
  Strength = "Strength", // Increases strength
  Agility = "Agility", // Increases agility
  Intelligence = "Intelligence", // Increases intelligence
  Vitality = "Vitality", // Increases max life
  Armor = "Armor", // Increases defense
  DamageReflex = "DamageReflex", // Reflex Damage
}

export enum GemTier {
  Common = "Common",
  Uncommon = "Uncommon",
  Rare = "Rare",
}

export class Gem {
  type: GemType;
  tier: GemTier;
  effectValue: number;

  constructor(type: GemType, tier: GemTier, effectValue: number) {
    this.type = type;
    this.tier = tier;
    this.effectValue = effectValue;
  }
}