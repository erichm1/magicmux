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
      equippedItems: character.equippedItems.map(item => ({
        name: item.name,
        type: item.type,
        attackBonus: item.attackBonus,
        defenseBonus: item.defenseBonus,
        gemSlots: item.gemSlots,
        requiredClass: item.requiredClass,
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
        parsedData.classType,
        parsedData.level,
        parsedData.equippedItems
      );
      character.equippedItems = parsedData.equippedItems.map((item: any) => {
        return new Item(
          item.name,
          item.type,
          item.requiredClass,
          item.attackBonus,
          item.defenseBonus,
          item.gemSlots
        );
      });
      console.log("Character loaded!");
      return character;
    }
    return null;
  } catch (error) {
    console.error("Error loading character state", error);
    return null;
  }
};
