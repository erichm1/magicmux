import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../game/entities/Character';
import { HeroClass } from '../game/entities/HeroClass';
import { Skill } from '../game/entities/Skill';
import { Equipment } from '../game/entities/Equipment';

const CHARACTER_STORAGE_KEY = 'characters';
const ACTIVE_CHARACTER_KEY = 'active_character'; // Chave para armazenar o personagem ativo

// Função para salvar a lista de personagens
export const saveCharacters = async (characters: Character[]) => {
  try {
    await AsyncStorage.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(characters));
  } catch (error) {
    console.error("Erro ao salvar personagens:", error);
  } 
};

// Função para carregar todos os personagens
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

// Função para criar um novo personagem
export const createCharacter = async (name: string, classType: HeroClass) => {
  const newCharacter = new Character(name, [], [], classType);
  const characters = await loadCharacters();
  characters.push(newCharacter);
  await saveCharacters(characters);
};

// Função para atualizar um personagem existente
export const updateCharacter = async (updatedCharacter: Character) => {
  try {
    const characters = await loadCharacters();
    const index = characters.findIndex(c => c.name === updatedCharacter.name);
    if (index !== -1) {
      characters[index] = updatedCharacter; // Atualiza o personagem
      await saveCharacters(characters); // Salva a lista atualizada
    }
  } catch (error) {
    console.error("Erro ao atualizar personagem:", error);
  }
};

// Função para definir o personagem ativo
export const setActiveCharacter = async (character: Character) => {
  try {
    await AsyncStorage.setItem(ACTIVE_CHARACTER_KEY, JSON.stringify(character));
  } catch (error) {
    console.error("Erro ao salvar personagem ativo:", error);
  }
};

// Função para carregar o personagem ativo
export const loadActiveCharacter = async (): Promise<Character | null> => {
  try {
    const data = await AsyncStorage.getItem(ACTIVE_CHARACTER_KEY);
    if (!data) return null;

    const parsedData = JSON.parse(data);
    const activeCharacter = Object.assign(new Character('', [], [], HeroClass.Warrior), parsedData); 
    return activeCharacter;
  } catch (error) {
    console.error("Erro ao carregar personagem ativo:", error);
    return null;
  }
};


// Função para limpar o personagem ativo
export const clearActiveCharacter = async () => {
  try {
    await AsyncStorage.removeItem(ACTIVE_CHARACTER_KEY);
  } catch (error) {
    console.error("Erro ao remover personagem ativo:", error);
  }
};
