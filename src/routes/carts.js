const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts');

// Ruta para crear un nuevo carrito
router.post('/', cartsController.createCart);

// Ruta para listar productos en un carrito por ID
router.get('/:cid', cartsController.getCartById);

// Ruta para agregar un producto al carrito
router.post('/:cid/product/:pid', cartsController.addProductToCart);

module.exports = router;
