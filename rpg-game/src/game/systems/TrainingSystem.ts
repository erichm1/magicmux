// src/game/systems/SkillTraining.ts

import { Character } from "../entities/Character";

export class SkillTraining {
  static train(character: Character, skillType: string, hours: number) {
    let bonus = 0;

    switch (character.classType) {
      case "Warrior":
        bonus = skillType === "strength" ? 10 : 5;
        break;
      case "Mage":
        bonus = skillType === "intelligence" ? 10 : 5;
        break;
      case "Rogue":
        bonus = skillType === "agility" ? 10 : 5;
        break;
      default:
        bonus = 5;
        break;
    }

    return `Trained ${skillType} for ${hours} hours. Bonus: ${bonus * hours}`;
  }
}
