// src/game/entities/Item.ts

import { Gem } from "./Gem";

export enum ItemType {
  Weapon = "Weapon",
  Armor = "Armor",
  Helmet = "Helmet",
  Boots = "Boots",
  Gloves = "Gloves",
  Shield = "Shield",
}

export enum HeroClass {
  Warrior = "Warrior",
  Mage = "Mage",
  Archer = "Archer",
}

export class Item {
  name: string;
  type: ItemType;
  requiredClass: HeroClass;
  attackBonus: number;
  defenseBonus: number;
  gemSlots: number;
  equippedGems: Gem[];

  constructor(name: string, type: ItemType, requiredClass: HeroClass, attackBonus: number, defenseBonus: number, gemSlots: number) {
    this.name = name;
    this.type = type;
    this.requiredClass = requiredClass;
    this.attackBonus = attackBonus;
    this.defenseBonus = defenseBonus;
    this.gemSlots = gemSlots;
    this.equippedGems = [];
  }

  equipGem(gem: Gem) {
    if (this.equippedGems.length < this.gemSlots) {
      this.equippedGems.push(gem);
    }
  }

  getTotalAttack(): number {
    return this.attackBonus + this.equippedGems.reduce((acc, gem) => acc + (gem.type === "Power" ? gem.effectValue : 0), 0);
  }

  getTotalDefense(): number {
    return this.defenseBonus + this.equippedGems.reduce((acc, gem) => acc + (gem.type === "Lifesteal" ? gem.effectValue : 0), 0);
  }
}
    