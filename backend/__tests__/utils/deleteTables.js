const User = require('../../src/app/models/User');

const tables = [User];

module.exports = () => {
  if (process.env.MODE === 'test') {
    tables.forEach(async (table) => {
      await table.dropTable();
    });
  }
};
