declare module 'react-native-quick-sqlite' {
    export interface SQLiteDatabase {
      execute: (query: string, params?: any[]) => {
        rowsAffected: number;
        rows: { [key: string]: any }[];
        insertId?: number;
      };
      close: () => void;
    }
  
    export function open(databaseName: string): SQLiteDatabase;
  }