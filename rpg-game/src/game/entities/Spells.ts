// src/game/entities/Spells.ts
import { Spell } from "./Spell";

export const Spells = {
  Warrior: [
    new Spell("Power Strike", 25, 10, false, false),
    new Spell("Berserk", 50, 30, true, false),
    new Spell("Earthquake", 100, 80, false, true),
  ],
  Mage: [
    new Spell("Fireball", 30, 20, false, false),
    new Spell("Ice Storm", 60, 40, true, false),
    new Spell("Meteor Shower", 120, 100, false, true),
  ],
  Rogue: [
    new Spell("Poison Dagger", 20, 5, false, false),
    new Spell("Shadow Strike", 45, 25, true, false),
    new Spell("Assassinate", 90, 70, false, true),
  ],
  Paladin: [
    new Spell("Holy Light", 20, 15, false, false),
    new Spell("Divine Smite", 55, 35, true, false),
    new Spell("Judgment", 110, 90, false, true),
  ],
  Necromancer: [
    new Spell("Dark Bolt", 25, 15, false, false),
    new Spell("Soul Harvest", 50, 35, true, false),
    new Spell("Plague of Death", 105, 95, false, true),
  ],
  Archer: [
    new Spell("Piercing Arrow", 22, 10, false, false),
    new Spell("Multi Shot", 48, 28, true, false),
    new Spell("Arrow Rain", 98, 75, false, true),
  ],
};
