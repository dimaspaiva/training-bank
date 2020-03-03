const User = require('../models/User');

module.exports = {
  store: async (req, res) => {
    const user = req.body;

    console.log(user);
    const newUser = await User.create(user);

    // console.log(newUser);

    res.status(200).send();
  },
};
