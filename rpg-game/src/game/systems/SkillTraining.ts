// src/game/systems/DrainSystem.ts

import { Character } from "../entities/Character";

export class DrainSystem {
  static lifeDrain(attacker: Character, target: Character, percentage: number) {
    const drainAmount = Math.floor((target.life * percentage) / 100);
    attacker.life = Math.min(attacker.maxLife, attacker.life + drainAmount);
    target.takeDamage(drainAmount);
  }

  static manaDrain(attacker: Character, target: Character, percentage: number) {
    const drainAmount = Math.floor((target.mana * percentage) / 100);
    attacker.mana = Math.min(attacker.maxMana, attacker.mana + drainAmount);
    target.mana = Math.max(0, target.mana - drainAmount);
  }
}
