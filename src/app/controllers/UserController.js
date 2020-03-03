const User = require('../models/User');

module.exports = {
  store: async (req, res) => {
    const user = req.body;

    const findUser = await User.selectEspecific(`cpf = '${user.cpf}'`);

    if (findUser) {
      return res.status(400).json({ message: 'User already registred' });
    }

    const newUser = await User.create(user);

    res.json({ ...newUser });
  },

  update: async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = req.body;

    const findUser = await User.selectEspecific(`id = ${id}`);

    if (Object.keys(data).length !== 4) {
      return res.status(400).json({ message: 'Missing data' });
    }

    if (!findUser) {
      return res.status(400).json({ message: 'User dont exist' });
    }

    const newUser = await User.update(id, data);

    return res.status(200).send({ ...newUser });
  },

  updateBills: async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = req.body;

    const user = await User.selectEspecific(`id = ${id}`);

    if (!user) {
      return res.status(400).json({ message: 'User dont exist' });
    }

    const bills = (await User.updateBillsValue(id, data)).toFixed(2);

    if (bills < 0) {
      return res
        .status(400)
        .json({ message: `Bills is lower then ${data.newBills}` });
    }

    const newUser = await User.updateUserBills(id, bills);

    return res.status(200).json({ ...newUser });
  },
};
