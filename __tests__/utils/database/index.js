const Model = require('./models');

const table = new Model({
  tableName: 'user',

  name: {
    type: 'TEXT',
    primaryKey: true,
    allowNull: false,
  },

  age: {
    type: 'INTEGER',
    allowNull: false,
  },

  email: {
    type: 'INTEGER',
    allowNull: false,
  },
});
