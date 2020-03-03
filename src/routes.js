const routes = require('express').Router();

const UserController = require('./app/controllers/UserController');

routes.post('/user', UserController.store);
routes.patch('/user/:id', UserController.update);

module.exports = routes;
