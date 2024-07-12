const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

// Ruta para listar todos los productos
router.get('/', productsController.getAllProducts);

// Ruta para obtener un producto por ID
router.get('/:pid', productsController.getProductById);

// Ruta para agregar un nuevo producto
router.post('/', productsController.addProduct);

// Ruta para actualizar un producto por ID
router.put('/:pid', productsController.updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/:pid', productsController.deleteProduct);

module.exports = router;