const productsController = require('./api/products/products.controller');
const usersController = require('./api/users/users.controller');

const initControllers = async (req, res) => {
    await productsController(req, res);
    await usersController(req, res);
}

module.exports = initControllers;