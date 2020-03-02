const db = require('../databaseConnection');

module.exports = class DbModel {
  constructor(table) {
    this.table = table;
    this.tableName = table.tableName;
  }

  generateTableQuery() {
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

  createTable() {
    const query = this.generateTableQuery(this.table);

    db.run(query);

    return `Create table ${this.table.tableName}`;
  }

  dropTable() {
    db.run(`DROP TABLE ${this.tableName}`);

    return `Drop table ${this.tableNameb}`;
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
};
