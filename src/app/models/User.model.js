const Model = require('../../database/models');

const user = new Model({
  tableName: 'user',

  id: {
    type: 'INTEGER',
    primaryKey: true,
    allowNull: false,
  },

  name: {
    type: 'TEXT',
    allowNull: false,
  },

  cpf: {
    type: 'TEXT',
    allowNull: false,
    unique: true,
  },

  salary: {
    type: 'REAL',
    allowNull: false,
  },

  bills: {
    type: 'REAL',
    allowNull: false,
  },

  createdAt: {
    type: 'DATE',
    allowNull: false,
  },

  updatedAt: {
    type: 'DATE',
    allowNull: false,
  },
});

module.exports = user;
