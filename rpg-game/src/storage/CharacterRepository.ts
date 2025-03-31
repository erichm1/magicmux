import db from './Database';
import { Character } from '../game/entities/Character';
import { Skill } from '../game/entities/Skill';
import { Equipment } from '../game/entities/Equipment';

// Insert a character
export const saveCharacter = (character: Character) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO characters (name, classType, level, experience, life, maxLife, mana, maxMana)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        character.name,
        character.classType,
        character.level,
        character.experience,
        character.life,
        character.maxLife,
        character.mana,
        character.maxMana
      ],
      (_, result) => {
        const characterId = result.insertId;
        saveSkills(character.skills, characterId);
        saveEquipment(character.equippedItems.map(item => new Equipment(
          item.name
        )), characterId);
      },
      (_, error) => {
        console.error('Error inserting character:', error);
        return false;
      }
    );
  });
};

// Insert skills for a character
const saveSkills = (skills: Skill[], characterId: number) => {
  db.transaction((tx: any) => {
    skills.forEach(skill => {
      tx.executeSql(
        `INSERT INTO skills (name, power, cooldown, manaCost, characterId)
         VALUES (?, ?, ?, ?, ?);`,
        [skill.name, (skill as any).power, (skill as any).cooldown, (skill as any).manaCost, characterId],
        () => console.log(`Skill ${skill.name} added`),
        (_: any, error: any) => console.error('Error inserting skill:', error)
      );
    });
  });
};

// Insert equipment for a character
const saveEquipment = (equipment: Equipment[], characterId: number) => {
  db.transaction((tx: any) => {
    equipment.forEach(item => {
      tx.executeSql(
        `INSERT INTO equipment (name, type, attackBonus, defenseBonus, gemSlots, requiredClass, characterId)
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [item.name, (item as any).type, (item as any).attackBonus, (item as any).defenseBonus, (item as any).gemSlots, (item as any).requiredClass, characterId],
        () => console.log(`Equipment ${item.name} added`),
        (_: any, error: any) => console.error('Error inserting equipment:', error)
      );
    });
  });
};

// Load all characters
export const loadCharacters = async (): Promise<Character[]> => {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM characters;`,
        [],
        (_, { rows }) => {
          const characters: Character[] = [];
          for (let i = 0; i < rows.length; i++) {
            characters.push(rows.item(i));
          }
          resolve(characters);
        },
        (_, error) => {
          console.error('Error loading characters:', error);
          return false;
        }
      );
    });
  });
};

// Load a single character by name
export const loadCharacterByName = async (name: string): Promise<Character | null> => {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM characters WHERE name = ? LIMIT 1;`,
        [name],
        async (_, { rows }) => {
          if (rows.length > 0) {
            const characterData = rows.item(0);
            const skills = await loadSkills(characterData.id);
            const equipment = await loadEquipment(characterData.id);
            const character = new Character(characterData.name, skills, equipment, characterData.classType);
            character.level = characterData.level;
            character.experience = characterData.experience;
            character.life = characterData.life;
            character.maxLife = characterData.maxLife;
            character.mana = characterData.mana;
            character.maxMana = characterData.maxMana;
            resolve(character);
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          console.error('Error loading character:', error);
          return false;
        }
      );
    });
  });
};

// Load skills for a character
const loadSkills = async (characterId: number): Promise<Skill[]> => {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM skills WHERE characterId = ?;`,
        [characterId],
        (_, { rows }) => {
          const skills: Skill[] = [];
          for (let i = 0; i < rows.length; i++) {
            skills.push(new Skill(rows.item(i).name, rows.item(i).power, rows.item(i).cooldown));
          }
          resolve(skills);
        },
        (_, error) => {
          console.error('Error loading skills:', error);
          return false;
        }
      );
    });
  });
};

// Load equipment for a character
const loadEquipment = async (characterId: number): Promise<Equipment[]> => {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM equipment WHERE characterId = ?;`,
        [characterId],
        (_, { rows }) => {
          const equipment: Equipment[] = [];
          for (let i = 0; i < rows.length; i++) {
            equipment.push(new Equipment(rows.item(i).name));
          }
          resolve(equipment);
        },
        (_, error) => {
          console.error('Error loading equipment:', error);
          return false;
        }
      );
    });
  });
};
