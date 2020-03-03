const routes = require('express').Router();

const UserController = require('./app/controllers/UserController');

routes.post('/user', UserController.store);

module.exports = routes;
