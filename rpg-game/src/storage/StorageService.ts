// src/storage/StorageService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../game/entities/Character';
import { Item } from '../game/entities/Item';

const STORAGE_KEY = '@game_state'; // The key we'll use to store the data

export const saveCharacterState = async (character: Character) => {
  try {
    const characterData = {
      name: character.name,
      classType: character.classType,
      level: character.level,
      experience: character.experience,
      life: character.life,
      maxLife: character.maxLife,
      mana: character.mana,
      maxMana: character.maxMana,
      equippedItems: character.equippedItems.map(item => ({
        name: item.name,
        type: item.type,
        attackBonus: item.attackBonus,
        defenseBonus: item.defenseBonus,
        gemSlots: item.gemSlots,
        requiredClass: item.requiredClass,
      })),
      skills: character.skills.map(skill => ({
        name: skill.name,
        description: skill.description,
        manaCost: skill.manaCost,
      })),
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(characterData));
    console.log("Character saved!");
  } catch (error) {
    console.error("Error saving character state", error);
  }
};

// src/storage/StorageService.ts

export const loadCharacterState = async (): Promise<Character | null> => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const character = new Character(
        parsedData.name,
        parsedData.skills.map((skill: any) => new Skill(skill.name, skill.description, skill.manaCost)),
        parsedData.equippedItems.map((item: any) => new Item(
          item.name,
          item.type,
          item.requiredClass,
          item.attackBonus,
          item.defenseBonus,
          item.gemSlots
        )),
        parsedData.classType
      );

      // Restore other character attributes
      character.level = parsedData.level;
      character.experience = parsedData.experience;
      character.life = parsedData.life;
      character.maxLife = parsedData.maxLife;
      character.mana = parsedData.mana;
      character.maxMana = parsedData.maxMana;

      console.log("Character loaded!");
      return character;
    }
    return null;
  } catch (error) {
    console.error("Error loading character state", error);
    return null;
  }
};

