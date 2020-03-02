const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db = {};
switch (process.env.MODE) {
  case 'test':
    db = new sqlite3.Database(
      path.resolve(__dirname / +'/databases/databaseTestTest.sqlite')
    );
    break;
  case 'dev':
    db = new sqlite3.Database(
      path.resolve(__dirname / +'/databases/databaseTestDev.sqlite')
    );
    break;
  default:
    db = new sqlite3.Database(
      path.resolve(__dirname / +'/databases/databaseTest.sqlite')
    );
}

module.exports = db;
