const db = require('../databaseConnection');

module.exports = class DbModel {
  constructor(table) {
    this.table = table;
    this.tableName = table.tableName;
  }

  createTableQuery() {
    const { tableName } = this.table;
    delete this.table.tableName;

    let query = `CREATE TABLE IF NOT EXISTS ${tableName} (`;

    Object.keys(this.table).forEach((key) => {
      query = query.concat(
        `${key} ${this.table[key].type} ${
          this.table[key].primaryKey ? 'PRIMARY KEY' : ''
        } ${!this.table[key].allowNull ? 'NOT NULL' : ''} ${
          this.table[key].unique ? 'UNIQUE' : ''
        },`
      );
    });
    return query.slice(0, -2).concat(');');
  }

  async createTable() {
    const query = this.createTableQuery(this.table);

    db.run(query);

    const data = await new Promise((resolve, reject) => {
      db.all(`Create table ${this.table.tableName}`, (err, rows) => {
        console.log(rows);
        if (err) {
          reject(err);
        }

        resolve(rows);
      });
    });

    return data;
  }

  async dropTable() {
    db.run(`DROP TABLE ${this.tableName}`);

    const data = await new Promise((resolve, reject) => {
      db.all(`Drop table ${this.tableNameb}`, (err, rows) => {
        console.log(rows);
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
      db.all(`SELECT * FROM ${this.tableName};`, (err, rows) => {
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
      db.all(`SELECT * FROM ${this.tableName} WHERE ${query}`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    return data;
  }

  async create(object) {
    const data = await new Promise((resolve, reject) => {
      let query = `INSERT INTO ${this.tableName} (`;

      Object.keys(this.table).forEach((key) => {
        query = query.concat(`${key}, `);
      });
      query = query.slice(0, -2).concat(') value(');

      console.log(query);

      Object.keys(object).forEach((key) => {
        query = query.concat(`${object[key]}, `);
      });

      console.log(query);
    });
  }
};
