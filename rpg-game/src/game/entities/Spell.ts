// src/game/entities/Spell.ts
import { Gem } from "./Gem";

export class Spell {
  name: string;
  baseDamage: number;
  baseManaCost: number;
  special: boolean;
  supreme: boolean;
  gems: Gem[] = []; // Gems attached to the spell

  constructor(name: string, baseDamage: number, baseManaCost: number, special = false, supreme = false) {
    this.name = name;
    this.baseDamage = baseDamage;
    this.baseManaCost = baseManaCost;
    this.special = special;
    this.supreme = supreme;
  }

  attachGem(gem: Gem) {
    this.gems.push(gem);
  }

  getModifiedDamage(): number {
    let modifiedDamage = this.baseDamage;
    for (const gem of this.gems) {
      if (gem.type === "Power") {
        modifiedDamage += (this.baseDamage * gem.effectValue) / 100;
      }
    }
    return modifiedDamage;
  }

  getModifiedManaCost(): number {
    let modifiedMana = this.baseManaCost;
    for (const gem of this.gems) {
      if (gem.type === "Mana Efficiency") {
        modifiedMana -= (this.baseManaCost * gem.effectValue) / 100;
      }
    }
    return modifiedMana;
  }
}
