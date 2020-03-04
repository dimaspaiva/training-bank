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

  async cleanTable() {
    await new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-arrow-callback
      db.run(`DELETE FROM ${this.tableName}`, [], function(err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });

    return 'Table clean';
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

  // querry = begin after the "where" in big query
  async selectEspecific(query) {
    const data = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${this.tableName} WHERE ${query};`, (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      });
    });

    return data[0];
  }

  async create(table) {
    let query = `INSERT INTO ${this.tableName} (`;
    Object.keys(table).forEach((key) => {
      query = query.concat(`${key}, `);
    });
    query = query.slice(0, -2).concat(') VALUES(');
    Object.keys(table).forEach((key) => {
      if (key !== 'createdAt' && key !== 'updatedAt') {
        if (typeof table[key] === 'string') {
          query = query.concat(`'${table[key]}', `);
        } else {
          query = query.concat(`${table[key]}, `);
        }
      }
    });

    query = query.slice(0, -2).concat(');');
    const id = await new Promise((resolve, reject) => {
      db.run(query, function(err) {
        if (err) {
          reject(err);
        }
        resolve(this.lastID);
      });
    });

    const data = await new Promise((resolve, reject) => {
      db.all(
        `select * from ${this.tableName} where id = ${id}`,
        (err, rows) => {
          if (err) {
            reject(err);
          }

          resolve(rows);
        },
      );
    });

    return data[0];
  }

  async update(id, data) {
    let query = `UPDATE ${this.tableName} SET `;

    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string') {
        query = query.concat(`${key} = '${data[key]}', `);
      } else {
        query = query.concat(`${key} = ${data[key]}, `);
      }
    });
    query = query.slice(0, -2).concat(` WHERE id = ${id};`);

    await new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-arrow-callback
      db.run(query, [], function(err) {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });

    const updated = await this.selectEspecific(`id = ${id}`);
    return updated;
  }

  async updateUserBills(id, bills) {
    const query = `UPDATE ${this.tableName} SET bills = ${bills} WHERE id = ${id};`;

    await new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-arrow-callback
      db.run(query, [], function(err) {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });

    return this.selectEspecific(`id = '${id}'`);
  }
};
