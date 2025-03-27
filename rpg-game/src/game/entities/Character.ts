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

        // Inicializar atributos antes do switch
        this.maxLife = 0;
        this.maxMana = 0;
        this.attackPower = 0;
        this.defense = 0;
        this.lifeRegen = 0;
        this.manaRegen = 0;
        this.equippedItems = [];


        // Definir atributos baseados na classe
        switch (classType) {
            case HeroClass.Warrior:
                this.maxLife = 150;
                this.maxMana = 30;
                this.attackPower = 15;
                this.defense = 10;
                this.lifeRegen = 5;
                this.manaRegen = 1;
                break;
            case HeroClass.Mage:
                this.maxLife = 80;
                this.maxMana = 120;
                this.attackPower = 10;
                this.defense = 5;
                this.lifeRegen = 2;
                this.manaRegen = 5;
                break;
            case HeroClass.Rogue:
                this.maxLife = 100;
                this.maxMana = 50;
                this.attackPower = 20;
                this.defense = 7;
                this.lifeRegen = 3;
                this.manaRegen = 2;
                break;
            case HeroClass.Paladin:
                this.maxLife = 130;
                this.maxMana = 80;
                this.attackPower = 12;
                this.defense = 12;
                this.lifeRegen = 4;
                this.manaRegen = 3;
                break;
            case HeroClass.Necromancer:
                this.maxLife = 90;
                this.maxMana = 150;
                this.attackPower = 14;
                this.defense = 4;
                this.lifeRegen = 3;
                this.manaRegen = 6;
                break;
            case HeroClass.Archer:
                this.maxLife = 110;
                this.maxMana = 40;
                this.attackPower = 18;
                this.defense = 6;
                this.lifeRegen = 3;
                this.manaRegen = 2;
                break;
            default:
                throw new Error("Classe inválida");
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
        return this.level * 100;
    }
}
