import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, Card, Modal, ProgressBar } from 'react-bootstrap';
import { Character } from './src/game/entities/Character';
import { loadCharacters, createCharacter, updateCharacter } from './src/storage/CharacterService';
import { HeroClass } from './src/game/entities/HeroClass';
import { Monster } from './src/game/entities/Monster';
import { loadMonsters, createMonster, updateMonster } from './src/storage/MonsterService';

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState<HeroClass>(HeroClass.Warrior);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);

  // Variáveis de controle para o modal
  const [monsterName, setMonsterName] = useState('');
  const [monsterType, setMonsterType] = useState('');
  const [monsterLevel, setMonsterLevel] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingMonsterId, setEditingMonsterId] = useState<string | null>(null);
  const [battleEffects, setBattleEffects] = useState<string | null>(null);

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

    if (editingMonsterId) {
      // Atualiza o monstro se estiver editando
      await updateMonster(editingMonsterId, monsterName, monsterType, monsterLevel);
    } else {
      // Cria um novo monstro
      await createMonster(monsterName, monsterType, monsterLevel);
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

  const handleAttack = () => {
    if (!activeCharacter) return;
  
    const attackDamage = activeCharacter.attackPower;
  
    // Escolher um monstro aleatório
    const targetMonster = monsters[Math.floor(Math.random() * monsters.length)];
  
    if (targetMonster) {
      // Calcula o dano no monstro e atualiza sua vida
      targetMonster.health -= attackDamage;
  
      // Exibe a quantidade de dano
      setBattleEffects(`Você causou ${attackDamage} de dano no monstro ${targetMonster.name}.`);
  
      // Se o monstro morrer
      if (targetMonster.health <= 0) {
        setMonsters(monsters.filter(m => m !== targetMonster));
  
        // Ganha XP
        const gainedXP = targetMonster.level * 10;
        if (activeCharacter) {
          activeCharacter.gainExperience(gainedXP);
          updateCharacter(activeCharacter); // Make sure the character is updated
          
          // Save the updated character state
          saveCharacterState(activeCharacter); // Save after gaining XP
  
          setBattleEffects(`Você derrotou o monstro ${targetMonster.name} e ganhou ${gainedXP} XP!`);
        }
      }
  
      // Atualiza a lista de monstros
      updateMonster(targetMonster.id, targetMonster.name, targetMonster.type, targetMonster.level);
    }
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
                <Button variant="danger" onClick={handleAttack} className="w-100 mt-3">
                  Atacar Monstro
                </Button>
                <Button variant="secondary" onClick={() => setActiveCharacter(null)} className="w-100 mt-3">
                  Sair do Jogo
                </Button>

                {/* Exibe os efeitos de batalha */}
                {battleEffects && <div className="mt-3 text-success">{battleEffects}</div>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Modal para criação de monstros */}
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
                    <Card.Title>{monster.name}</Card.Title>
                    <Card.Text>Tipo: {monster.type} - Nível {monster.level}</Card.Text>
                    <ProgressBar 
                      now={(monster.health / monster.maxHealth) * 100} 
                      label={`Vida: ${monster.health} / ${monster.maxHealth}`} 
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
    </Container>
  );
};

export default App;
