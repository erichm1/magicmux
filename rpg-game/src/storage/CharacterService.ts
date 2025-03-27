import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../game/entities/Character';
import { HeroClass } from '../game/entities/HeroClass';
import { Skill } from '../game/entities/Skill';
import { Equipment } from '../game/entities/Equipment';

const CHARACTER_STORAGE_KEY = 'characters';

export const saveCharacters = async (characters: Character[]) => {
  try {
    await AsyncStorage.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(characters));
  } catch (error) {
    console.error("Erro ao salvar personagens:", error);
  }
};

export const loadCharacters = async (): Promise<Character[]> => {
  try {
    const data = await AsyncStorage.getItem(CHARACTER_STORAGE_KEY);
    if (!data) return [];
    
    const parsedData = JSON.parse(data);
    return parsedData.map((char: any) => new Character(
      char.name,
      char.skills || [],
      char.equipment || [],
      char.classType
    ));
  } catch (error) {
    console.error("Erro ao carregar personagens:", error);
    return [];
  }
};

export const createCharacter = async (name: string, classType: HeroClass) => {
  const newCharacter = new Character(name, [], [], classType);
  const characters = await loadCharacters();
  characters.push(newCharacter);
  await saveCharacters(characters);
};


const updateCharacter = async (updatedCharacter: Character) => {
  try {
    const characters = await loadCharacters();
    const index = characters.findIndex(c => c.name === updatedCharacter.name);
    if (index !== -1) {
      characters[index] = updatedCharacter; // Update the character
      await saveCharacters(characters); // Save the updated list
      setCharacters(characters); // Update the state as well
    }
  } catch (error) {
    console.error("Error updating character", error);
  }
};


