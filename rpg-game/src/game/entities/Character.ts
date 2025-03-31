// src/game/systems/SkillTraining.ts

import { Item } from "./Item";
import { Skill } from "./Skill";
import { SkillTree } from "./SkillTree";
import { HeroClass } from "./HeroClass";
import { Equipment } from "./Equipment";
import { GemType } from "./Gem";

export class Character {
    name: string;
    classType: HeroClass;
    level: number;
    experience: number;
    life: number;
    maxLife: number;
    mana: number;
    maxMana: number;
    lifeRegen: number;
    manaRegen: number;
    attackPower: number;
    defense: number;
    strength: number;
    agility: number;
    intelligence: number;
    skills: Skill[];
    equipment: Equipment[];
    equippedItems: Item[];
    skillTree?: SkillTree;
  
    constructor(name: string, skills: Skill[] = [], equipment: Equipment[] = [], classType: HeroClass) {
      this.name = name;
      this.classType = classType;
      this.skills = skills;
      this.equipment = equipment;
      this.level = 1;
      this.experience = 0;
  
      // Initialize attributes before switch
      this.maxLife = 0;
      this.maxMana = 0;
      this.attackPower = 0;
      this.defense = 0;
      this.lifeRegen = 0;
      this.manaRegen = 0;
      this.equippedItems = [];
      this.strength = 0;
      this.agility = 0;
      this.intelligence = 0;
  
      // Define attributes based on class
      switch (classType) {
        case HeroClass.Warrior:
          this.maxLife = 150;
          this.maxMana = 30;
          this.attackPower = 15;
          this.defense = 10;
          this.lifeRegen = 5;
          this.manaRegen = 1;
          this.strength = 18;
          this.agility = 12;
          this.intelligence = 8;
          break;
        case HeroClass.Mage:
          this.maxLife = 80;
          this.maxMana = 120;
          this.attackPower = 10;
          this.defense = 5;
          this.lifeRegen = 2;
          this.manaRegen = 5;
          this.strength = 8;
          this.agility = 10;
          this.intelligence = 18;
          break;
        case HeroClass.Rogue:
          this.maxLife = 100;
          this.maxMana = 50;
          this.attackPower = 20;
          this.defense = 7;
          this.lifeRegen = 3;
          this.manaRegen = 2;
          this.strength = 12;
          this.agility = 18;
          this.intelligence = 10;
          break;
        case HeroClass.Paladin:
          this.maxLife = 130;
          this.maxMana = 80;
          this.attackPower = 12;
          this.defense = 12;
          this.lifeRegen = 4;
          this.manaRegen = 3;
          this.strength = 15;
          this.agility = 12;
          this.intelligence = 10;
          break;
        case HeroClass.Necromancer:
          this.maxLife = 90;
          this.maxMana = 150;
          this.attackPower = 14;
          this.defense = 4;
          this.lifeRegen = 3;
          this.manaRegen = 6;
          this.strength = 10;
          this.agility = 12;
          this.intelligence = 18;
          break;
        case HeroClass.Archer:
          this.maxLife = 110;
          this.maxMana = 40;
          this.attackPower = 18;
          this.defense = 6;
          this.lifeRegen = 3;
          this.manaRegen = 2;
          this.strength = 12;
          this.agility = 18;
          this.intelligence = 10;
          break;
        default:
          throw new Error("Invalid class");
      }
  
      this.life = this.maxLife;
      this.mana = this.maxMana;
    }

    takeDamage(amount: number) {
        this.life = Math.max(0, this.life - Math.max(0, amount - this.defense));
    }

    regenerate() {
        this.life = Math.min(this.maxLife, this.life + this.lifeRegen);
        this.mana = Math.min(this.maxMana, this.mana + this.manaRegen);
    }

    gainExperience(exp: number) {
        this.experience += exp;
        while (this.experience >= this.getExpToLevelUp()) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.experience = 0;

        // Adiciona skill tree quando atinge nível 250
        if (this.level === 250) {
            this.skillTree = new SkillTree();
        }

        // Aumento de atributos baseado na classe
        switch (this.classType) {
            case HeroClass.Warrior:
                this.maxLife += 30;
                this.maxMana += 5;
                this.attackPower += 7;
                this.defense += 4;
                break;
            case HeroClass.Mage:
                this.maxLife += 10;
                this.maxMana += 25;
                this.attackPower += 5;
                this.defense += 2;
                break;
            case HeroClass.Rogue:
                this.maxLife += 15;
                this.maxMana += 10;
                this.attackPower += 8;
                this.defense += 3;
                break;
            case HeroClass.Paladin:
                this.maxLife += 25;
                this.maxMana += 15;
                this.attackPower += 6;
                this.defense += 5;
                break;
            case HeroClass.Necromancer:
                this.maxLife += 12;
                this.maxMana += 30;
                this.attackPower += 6;
                this.defense += 2;
                break;
            case HeroClass.Archer:
                this.maxLife += 20;
                this.maxMana += 8;
                this.attackPower += 7;
                this.defense += 3;
                break;
        }
    }

    useSkill(skillName: string) {
        const skill = this.skills.find(s => s.name === skillName);
        if (!skill) {
            console.warn(`Habilidade ${skillName} não encontrada.`);
            return;
        }
        skill.useSkill();
    }

    getStatBonus(type: GemType): number {
        return this.equipment.reduce((acc, eq) => acc + eq.getBonus(type), 0);
    }

    equipItem(item: Item) {
        if (item.requiredClass !== this.classType) {
            console.log(`${this.name} cannot equip ${item.name} because it is for ${item.requiredClass}`);
            return;
        }
        this.equippedItems.push(item);
        console.log(`${this.name} equipped ${item.name}`);
    }

    getTotalStats() {
        return {
            attack: this.equippedItems.reduce((acc, item) => acc + item.getTotalAttack(), 0),
            defense: this.equippedItems.reduce((acc, item) => acc + item.getTotalDefense(), 0),
        };
    }

    getExpToLevelUp(): number {
        return this.level * this.level * 50;  // Apply the new formula
    }

    attack(target: Character) {
        // Calcula o dano baseado no poder de ataque do personagem
        const damage = Math.max(0, this.attackPower); // Garantir que o dano não seja negativo
        console.log(`${this.name} ataca ${target.name} causando ${damage} de dano!`);

        // Aplica o dano no alvo
        target.takeDamage(damage);

        // Verifica se o monstro foi derrotado
        if (target.life <= 0) {
            console.log(`${target.name} foi derrotado!`);
        }
    }
}

// Exemplo de como garantir que o activeCharacter é uma instância de Character
let parsedData = {
    name: 'WarriorExample',
    classType: HeroClass.Warrior,
    skills: [],
    equipment: []
};

// Aqui, garantimos que activeCharacter é uma instância de Character
const activeCharacter = Object.assign(new Character('', [], [], HeroClass.Warrior), parsedData);

// Verifica e chama o método getExpToLevelUp corretamente
if (activeCharacter instanceof Character) {
    console.log(activeCharacter.getExpToLevelUp());
} else {
    console.log('activeCharacter não é uma instância de Character');
}
