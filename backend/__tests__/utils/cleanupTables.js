const User = require('../../src/app/models/User');

const tables = [User];

module.exports = async () => {
  if (process.env.MODE === 'test') {
    tables.forEach(async (table) => {
      await table.cleanTable();
    });
  }
};
