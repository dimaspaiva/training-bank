const db = require('../databaseConnection');

module.exports = class DbModel {
  constructor(table) {
    this.table = table;
    this.tableName = table.tableName;
    delete this.table.tableName;

    this.createTable();
  }

  createTableQuery() {
    let query = `CREATE TABLE IF NOT EXISTS ${this.tableName} (`;

    Object.keys(this.table).forEach((key) => {
      query = query.concat(
        `${key} ${this.table[key].type} ${
          this.table[key].primaryKey ? 'PRIMARY KEY' : ''
        } ${!this.table[key].allowNull ? 'NOT NULL' : ''} ${
          this.table[key].unique ? 'UNIQUE' : ''
        }, `,
      );
    });

    query = query.slice(0, -2).concat(');');

    return query;
  }

  async createTable() {
    const query = await this.createTableQuery();

    const data = await new Promise((resolve, reject) => {
      db.run(query, (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      });
    });

    return data;
  }

  async dropTable() {
    const data = await new Promise((resolve, reject) => {
      db.run(`DROP TABLE IF EXISTS ${this.tableName};`, (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      });
    });

    return data;
  }

  async selectAll() {
    const data = await new Promise((resolve, reject) => {
      db.run(`SELECT * FROM ${this.tableName};`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    return data;
  }

  async selectEspecific(query) {
    const data = await new Promise((resolve, reject) => {
      db.run(`SELECT * FROM ${this.tableName} WHERE ${query}`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    return data;
  }

  async create(table) {
    let query = `INSERT INTO ${this.tableName} (`;
    console.log(query);

    Object.keys(table).forEach((key) => {
      query = query.concat(`${key}, `);
    });
    query = query.slice(0, -2).concat(') value(');
    console.log(query);

    Object.keys(table).forEach((key) => {
      if (key !== 'createdAt' && key !== 'updatedAt') {
        query = query.concat(`${table[key]}, `);
      }
    });

    console.log(query);
    return 'ok';
  }
};
