const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db = {};
switch (process.env.MODE) {
  case 'test':
    db = new sqlite3.Database(
      path.resolve(__dirname, 'databaseTest.sqlite'),
      sqlite3.OPEN_READWRITE,
    );
    break;

  case 'dev':
    db = new sqlite3.Database(
      path.resolve(__dirname, 'databaseDev.sqlite'),
      sqlite3.OPEN_READWRITE,
    );
    break;

  default:
    db = new sqlite3.Database(
      path.resolve(__dirname, 'database.sqlite'),
      sqlite3.OPEN_READWRITE,
    );
    break;
}

module.exports = db;
