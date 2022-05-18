const productsController = require('./api/products/products.controller');

const initControllers = async (req, res) => {
    await productsController(req, res);
}

module.exports = initControllers;