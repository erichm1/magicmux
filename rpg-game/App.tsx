import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, Card, Modal, ProgressBar, Badge } from 'react-bootstrap';
import { Character } from './src/game/entities/Character';
import { loadCharacters, createCharacter, updateCharacter } from './src/storage/CharacterService';
import { HeroClass } from './src/game/entities/HeroClass';
import { Monster, MonsterType } from './src/game/entities/Monster';
import { saveCharacterState } from './src/storage/StorageService';
import { loadMonsters, createMonster, updateMonster, createRandomMonster } from './src/storage/MonsterService';
import { setupDatabase } from './src/storage/Database';

setupDatabase();

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState<HeroClass>(HeroClass.Warrior);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [autoAttackInterval, setAutoAttackInterval] = useState<NodeJS.Timeout | null>(null);

  // Modal controls
  const [monsterName, setMonsterName] = useState('');
  const [monsterType, setMonsterType] = useState('');
  const [monsterLevel, setMonsterLevel] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingMonsterId, setEditingMonsterId] = useState<string | null>(null);
  const [battleEffects, setBattleEffects] = useState<string | null>(null);
  const [damageBadge, setDamageBadge] = useState<number | null>(null); // State to manage damage badge

  useEffect(() => {
    const fetchCharacters = async () => {
      const loadedCharacters = await loadCharacters();
      setCharacters(loadedCharacters);
    };

    const fetchMonsters = async () => {
      const loadedMonsters = await loadMonsters();
      setMonsters(loadedMonsters);
    };

    fetchCharacters();
    fetchMonsters();
  }, []);

  const handleCreateCharacter = async () => {
    if (!name.trim()) return;
    await createCharacter(name, selectedClass);
    const updatedCharacters = await loadCharacters();
    setCharacters(updatedCharacters);
    setName('');
  };

  const handleEnterGame = (character: Character) => {
    setActiveCharacter(character);
  };

  const handleCreateMonster = async () => {
    if (!monsterName.trim() || !monsterType.trim()) return;
    const parsedMonsterType = monsterType as MonsterType;
    if (editingMonsterId) {
      await updateMonster(editingMonsterId, monsterName, parsedMonsterType, monsterLevel);
    } else {
      await createMonster(monsterName, parsedMonsterType, monsterLevel);
    }
    const updatedMonsters = await loadMonsters();
    setMonsters(updatedMonsters);
    setShowModal(false);
    setMonsterName('');
    setMonsterType('');
    setMonsterLevel(1);
    setEditingMonsterId(null);
  };

  const handleEditMonster = (monster: Monster) => {
    setMonsterName(monster.name);
    setMonsterType(monster.type);
    setMonsterLevel(monster.level);
    setEditingMonsterId(monster.id);
    setShowModal(true);
  };

  const handleAttack = (activeCharacter: Character) => {
    if (!activeCharacter || monsters.length === 0) return;

    const attackDamage = activeCharacter.attackPower;
    const targetMonsterIndex = Math.floor(Math.random() * monsters.length);
    const targetMonster = monsters[targetMonsterIndex];

    if (targetMonster) {
      const updatedMonsters = monsters.map(monster => {
        if (monster.id === targetMonster.id) {
          return { ...monster, health: monster.health - attackDamage };
        }
        return monster;
      });
      setMonsters(updatedMonsters);
      setBattleEffects(`Você causou ${attackDamage} de dano no monstro ${targetMonster.name}.`);

      if (updatedMonsters[targetMonsterIndex].health <= 0) {
        setMonsters(prevMonsters => prevMonsters.filter(monster => monster.id !== targetMonster.id));
        const gainedXP = updatedMonsters[targetMonsterIndex].xpOnKill;
        activeCharacter.gainExperience(gainedXP);
        setActiveCharacter(Object.assign(new Character(activeCharacter.name, activeCharacter.skills, activeCharacter.equipment, activeCharacter.classType), {
          ...activeCharacter,
          experience: activeCharacter.experience + gainedXP,
        }));
        updateCharacter(activeCharacter);
        saveCharacterState(activeCharacter);
        setBattleEffects(`Você derrotou ${targetMonster.name} e ganhou ${gainedXP} XP!`);
      }
      updateMonster(targetMonster.id, targetMonster.name, targetMonster.type, targetMonster.level);
      setDamageBadge(attackDamage);
    }
  };

  // Updated autoAttack using functional state updates for monsters
  const autoAttack = () => {
    if (!activeCharacter) return;
    setMonsters(prevMonsters => {
      if (prevMonsters.length === 0) {
        setBattleEffects("Nenhum monstro disponível para atacar.");
        stopAutoAttack();
        return prevMonsters;
      }
      // Select a random monster from the current list
      const targetMonsterIndex = Math.floor(Math.random() * prevMonsters.length);
      const targetMonster = prevMonsters[targetMonsterIndex];
      const attackDamage = activeCharacter.attackPower;
      const updatedMonster = { ...targetMonster, health: Math.max(0, targetMonster.health - attackDamage) };

      // Create new monster list with updated health for the target monster
      let newMonsters = prevMonsters.map(monster => {
        if (monster.id === targetMonster.id) {
          return updatedMonster;
        }
        return monster;
      });

      setDamageBadge(attackDamage);

      // If the target monster is defeated, remove it and update character XP
      if (updatedMonster.health <= 0) {
        newMonsters = newMonsters.filter(monster => monster.id !== updatedMonster.id);
        const gainedXP = updatedMonster.xpOnKill;
        activeCharacter.gainExperience(gainedXP);
        setActiveCharacter(Object.assign(new Character(activeCharacter.name, activeCharacter.skills, activeCharacter.equipment, activeCharacter.classType), {
          ...activeCharacter,
          experience: activeCharacter.experience + gainedXP,
        }));
        updateCharacter(activeCharacter);
        saveCharacterState(activeCharacter);
        setBattleEffects(`Você derrotou ${targetMonster.name} e ganhou ${gainedXP} XP!`);
      } else {
        setBattleEffects(`Você causou ${attackDamage} de dano no monstro ${targetMonster.name}.`);
      }
      // Update the monster in the database
      updateMonster(targetMonster.id, targetMonster.name, targetMonster.type, targetMonster.level);
      return newMonsters;
    });
  };

  const startAutoAttack = () => {
    if (autoAttackInterval) {
      clearInterval(autoAttackInterval);
    }
    const interval = setInterval(() => {
      autoAttack();
    }, 3000);
    setAutoAttackInterval(interval);
    console.log("Auto attack started with interval ID: ", interval);
  };

  const stopAutoAttack = () => {
    if (autoAttackInterval) {
      clearInterval(autoAttackInterval);
      setAutoAttackInterval(null);
      console.log("Auto attack stopped.");
    }
  };

  const handleCreateRandomMonster = async () => {
    const level = 1;
    const newMonster = await createRandomMonster(level);
    setMonsters(prevMonsters => [...prevMonsters, newMonster]);
  };

  return (
    <Container className="mt-5">
      {!activeCharacter ? (
        <>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="text-center bg-dark text-light border-warning">
                <Card.Header className="fw-bold text-warning">Criação de Personagem</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="text" 
                        placeholder="Nome do personagem" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Row className="mb-3">
                      {Object.values(HeroClass).map((hero) => (
                        <Col key={hero} xs={6} className="mb-2">
                          <Button 
                            variant={selectedClass === hero ? "warning" : "secondary"} 
                            className="w-100"
                            onClick={() => setSelectedClass(hero)}
                          >
                            {hero}
                          </Button>
                        </Col>
                      ))}
                    </Row>
                    <Button variant="success" className="w-100" onClick={handleCreateCharacter}>
                      Criar Personagem
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h3 className="text-warning text-center">Personagens Salvos</h3>
              <Row>
                {characters.map((char, index) => (
                  <Col key={index} md={4} className="mb-3">
                    <Card className="bg-dark text-light border-light">
                      <Card.Body>
                        <Card.Title>{char.name}</Card.Title>
                        <Card.Text>{char.classType} - Nível {char.level}</Card.Text>
                        <Button variant="primary" onClick={() => handleEnterGame(char)}>
                          Entrar no Jogo
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="text-center bg-dark text-light border-primary">
              <Card.Header className="fw-bold text-primary">Jogo Iniciado</Card.Header>
              <Card.Body>
                <h3>{activeCharacter.name}</h3>
                <p>Classe: {activeCharacter.classType}</p>
                <p>Nível: {activeCharacter.level}</p>
                <p>XP: {activeCharacter.experience} / {activeCharacter.getExpToLevelUp()}</p>
                <Button 
                  variant="danger" 
                  onClick={() => handleAttack(activeCharacter)} 
                  className="w-100 mt-3"
                >
                  Atacar Monstro
                </Button>
                <Button
                  variant="danger"
                  onClick={startAutoAttack}
                  className="w-100 mt-3"
                >
                  Atacar Automaticamente
                </Button>
                <Button
                  variant="secondary"
                  onClick={stopAutoAttack}
                  className="w-100 mt-3"
                >
                  Parar Atacar Automaticamente
                </Button>
                <Button variant="secondary" onClick={() => setActiveCharacter(null)} className="w-100 mt-3">
                  Sair do Jogo
                </Button>
                {battleEffects && <div className="mt-3 text-success">{battleEffects}</div>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingMonsterId ? 'Editar Monstro' : 'Criar Monstro'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nome do monstro"
                value={monsterName}
                onChange={(e) => setMonsterName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Tipo do monstro (Ex: Goblin, Dragon)"
                value={monsterType}
                onChange={(e) => setMonsterType(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Nível do monstro"
                value={monsterLevel}
                onChange={(e) => setMonsterLevel(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleCreateMonster}>
            {editingMonsterId ? 'Atualizar' : 'Criar'} Monstro
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="mt-5">
        <Col>
          <h3 className="text-danger text-center">Monstros Criados</h3>
          <Row>
            {monsters.map((monster, index) => (
              <Col key={index} md={4} className="mb-3">
                <Card className="bg-dark text-light border-danger">
                  <Card.Body>
                    <div className="position-relative">
                      <Card.Title>{monster.name}</Card.Title>
                      <Badge pill bg="danger" className="position-absolute top-0 end-0 m-2">
                        {damageBadge} Dano!
                      </Badge>
                    </div>
                    <Card.Text>Tipo: {monster.type} - Nível {monster.level}</Card.Text>
                    <ProgressBar 
                      now={(monster.health / monster.maxHealth) * 100} 
                      label={`${monster.health} / ${monster.maxHealth}`} 
                    />
                    <Button variant="warning" onClick={() => handleEditMonster(monster)}>
                      Editar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Button variant="success" className="w-100 mt-5" onClick={() => setShowModal(true)}>
        Criar Monstro
      </Button>
      <Button 
        variant="info" 
        className="w-100 mt-5" 
        onClick={handleCreateRandomMonster}
      >
        Criar Monstro Aleatório
      </Button>
    </Container>
  );
};

export default App;
