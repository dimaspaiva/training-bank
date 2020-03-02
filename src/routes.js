const routes = require('express').Router();

routes.post('/user', (req, res) => {
  console.log(req.body);

  return res.status(200).send();
});

module.exports = routes;
