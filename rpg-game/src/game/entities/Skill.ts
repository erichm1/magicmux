// src/game/entities/Skill.ts

export class Skill {
    name: string;
    baseDamage: number;
    baseManaCost: number;
    level: number;
    experience: number;
    expToNextLevel: number;
  
    constructor(name: string, baseDamage: number, baseManaCost: number) {
      this.name = name;
      this.baseDamage = baseDamage;
      this.baseManaCost = baseManaCost;
      this.level = 1;
      this.experience = 0;
      this.expToNextLevel = 100; // Base XP requirement
    }
  
    useSkill() {
      this.experience += 10; // Gain XP per use
  
      if (this.experience >= this.expToNextLevel) {
        this.levelUp();
      }
    }
  
    levelUp() {
      this.level++;
      this.experience = 0;
      this.expToNextLevel *= 1.2; // Increase XP requirement for next level
      this.baseDamage *= 1.1; // Increase damage by 10%
      this.baseManaCost *= 0.95; // Reduce mana cost by 5%
    }
  }
  