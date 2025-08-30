import Database from 'better-sqlite3';

const db = new Database('./logs.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level TEXT,
    message TEXT,
    timestamp TEXT,
    userId TEXT,
    url TEXT,
    userAgent TEXT,
    stacktrace TEXT
  )
`);

export default db;
