// src/game/entities/Equipment.ts

import { Gem, GemType } from "./Gem";

export class Equipment {
  name: string;
  gems: Gem[] = [];

  constructor(name: string) {
    this.name = name;
  }

  equipGem(gem: Gem) {
    if (this.gems.length < 3) { // Limit gems per item
      this.gems.push(gem);
    }
  }

  getBonus(type: GemType): number {
    return this.gems.filter(g => g.type === type).reduce((acc, g) => acc + g.effectValue, 0);
  }
}