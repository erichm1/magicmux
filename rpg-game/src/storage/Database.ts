import 'timers'; // Adiciona suporte ao setImmediate
import SQLite from 'react-native-sqlite-storage';


// Open (or create) the database
const db = SQLite.openDatabase(
  { name: 'rpg_game.db', location: 'default' },
  () => console.log('Database opened successfully'),
  error => console.error('Database opening error:', error)
);

// Create tables if they don't exist
export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        classType TEXT,
        level INTEGER,
        experience INTEGER,
        life INTEGER,
        maxLife INTEGER,
        mana INTEGER,
        maxMana INTEGER
      );`,
      [],
      () => console.log('Characters table created'),
      error => console.error('Error creating table:', error)
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        power INTEGER,
        cooldown INTEGER,
        manaCost INTEGER,
        characterId INTEGER,
        FOREIGN KEY (characterId) REFERENCES characters(id) ON DELETE CASCADE
      );`,
      [],
      () => console.log('Skills table created'),
      error => console.error('Error creating skills table:', error)
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS equipment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type TEXT,
        attackBonus INTEGER,
        defenseBonus INTEGER,
        gemSlots INTEGER,
        requiredClass TEXT,
        characterId INTEGER,
        FOREIGN KEY (characterId) REFERENCES characters(id) ON DELETE CASCADE
      );`,
      [],
      () => console.log('Equipment table created'),
      error => console.error('Error creating equipment table:', error)
    );
  });
};

export default db;
