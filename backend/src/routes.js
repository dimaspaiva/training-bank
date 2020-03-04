const routes = require('express').Router();

const UserController = require('./app/controllers/UserController');

routes.post('/user', UserController.store);
routes.put('/user/:id', UserController.update);
routes.patch('/user/bills/:id', UserController.updateBills);

module.exports = routes;
