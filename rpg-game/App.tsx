// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Button, View, Text, TextInput, FlatList } from 'react-native';
import { Character } from './src/game/entities/Character';
import { loadCharacters, createCharacter } from './src/storage/CharacterService';
import { HeroClass } from './src/game/entities/HeroClass';

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState(HeroClass.Warrior);

  useEffect(() => {
    const fetchCharacters = async () => {
      const loadedCharacters = await loadCharacters();
      setCharacters(loadedCharacters);
    };

    fetchCharacters();
  }, []);

  const handleCreateCharacter = async () => {
    if (!name.trim()) return;
    await createCharacter(name, selectedClass);
    const updatedCharacters = await loadCharacters();
    setCharacters(updatedCharacters);
    setName('');
  };

  return (
    <View>
      <Text>Criação de Personagem</Text>
      <TextInput
        placeholder="Nome do personagem"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      
      <Button title="Criar Guerreiro" onPress={() => setSelectedClass(HeroClass.Warrior)} />
      <Button title="Criar Mago" onPress={() => setSelectedClass(HeroClass.Mage)} />
      <Button title="Criar Personagem" onPress={handleCreateCharacter} />

      <Text>Personagens Salvos:</Text>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text>{`${item.name} - ${item.classType} - Nível ${item.level}`}</Text>
        )}
      />
    </View>
  );
};

export default App;