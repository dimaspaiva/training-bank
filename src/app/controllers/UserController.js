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

    // console.log(data);

    const bills = await User.updateBills(id, data);

    console.log(bills);

    const newUser = await User.update(id, bills);

    return res.status(200).json({ ...newUser });
  },
};
