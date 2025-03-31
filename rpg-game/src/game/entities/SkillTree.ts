// src/game/entities/SkillTree.ts

export enum SkillTreeBranch {
  Offense = "Offense",
  Defense = "Defense",
  Magic = "Magic",
}

export class SkillTreeNode {
  name: string;
  description: string;
  unlocked: boolean;
  requiredLevel: number;

  constructor(name: string, description: string, requiredLevel: number) {
    this.name = name;
    this.description = description;
    this.unlocked = false;
    this.requiredLevel = requiredLevel;
  }

  unlock(characterLevel: number) {
    if (characterLevel >= this.requiredLevel) {
      this.unlocked = true;
    }
  }
}

export class SkillTree {
  branches: Record<SkillTreeBranch, SkillTreeNode[]> = {
    [SkillTreeBranch.Offense]: [
      new SkillTreeNode("Master Swordsman", "Increase attack by 20%", 250),
      new SkillTreeNode("Berserker Rage", "Boost damage while below 30% HP", 275),
    ],
    [SkillTreeBranch.Defense]: [
      new SkillTreeNode("Iron Wall", "Increase defense by 25%", 250),
      new SkillTreeNode("Last Stand", "Survive fatal hit with 1 HP", 275),
    ],
    [SkillTreeBranch.Magic]: [
      new SkillTreeNode("Mana Overflow", "Increase max mana by 30%", 250),
      new SkillTreeNode("Arcane Mastery", "Reduce spell cooldowns by 15%", 275),
    ],
  };

  unlockSkill(characterLevel: number, branch: SkillTreeBranch, skillIndex: number) {
    const skill = this.branches[branch][skillIndex];
    skill.unlock(characterLevel);
  }

  applyToBaseStats(baseStats: BaseStats) {
    Object.keys(this.branches).forEach((branch) => {
      this.branches[branch as SkillTreeBranch].forEach((skill: SkillTreeNode) => {
        if (skill.unlocked) {
          baseStats.applySkillTreeModifier(skill.name, 1); // assuming a modifier value of 1 for now
        }
      });
    });
  }
}