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
    type: 'DATETIME DEFAULT CURRENT_TIMESTAMP',
    allowNull: false,
  },

  updatedAt: {
    type: 'DATETIME DEFAULT CURRENT_TIMESTAMP',
    allowNull: false,
  },
});

Model.prototype.updateBillsValue = async (id, { newBills, signal }) => {
  const { bills } = await user.selectEspecific(`id = ${id}`);

  if (!newBills) {
    return 0;
  }

  if (signal) {
    return parseFloat(parseFloat(bills) - parseFloat(newBills));
  }

  return parseFloat(bills) + parseFloat(newBills);
};

module.exports = user;
