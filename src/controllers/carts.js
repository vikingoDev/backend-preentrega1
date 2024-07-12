const fs = require('fs');
const path = require('path');
const cartsFilePath = path.join(__dirname, '../data/carts.json');
const productsFilePath = path.join(__dirname, '../data/products.json');

// Leer carritos desde el archivo JSON
const readCartsFromFile = () => {
    if (fs.existsSync(cartsFilePath)) {
        const data = fs.readFileSync(cartsFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
};

// Leer productos desde el archivo JSON
const readProductsFromFile = () => {
    if (fs.existsSync(productsFilePath)) {
        const data = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
};

// Escribir carritos en el archivo JSON
const writeCartsToFile = (carts) => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2), 'utf-8');
};

// Crear un nuevo carrito
exports.createCart = (req, res) => {
    const carts = readCartsFromFile();
    const newCart = {
        id: carts.length + 1, // Generar un ID único
        products: []
    };
    carts.push(newCart);
    writeCartsToFile(carts);
    res.status(201).json(newCart);
};

// Listar productos en un carrito por ID
exports.getCartById = (req, res) => {
    const carts = readCartsFromFile();
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
    }
};

// Agregar un producto al carrito
exports.addProductToCart = (req, res) => {
    const carts = readCartsFromFile();
    const products = readProductsFromFile();
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    const product = products.find(p => p.id === parseInt(req.params.cid));
    const quantityToAdd = parseInt(req.body.quantity); // Parsea la cantidad ingresada a entero

    if (!quantityToAdd || isNaN(quantityToAdd)) {
        return res.status(400).json({ message: 'La cantidad ingresada no es válida' });
    }

    if (cart && product) {
        let productInCart = cart.products.find(p => p.product === req.params.pid);

        if (productInCart) {
            productInCart.quantity += quantityToAdd; // Suma la cantidad ingresada al producto existente en el carrito
        } else {
            cart.products.push({ product: req.params.pid, quantity: quantityToAdd }); // Agrega el producto al carrito con la cantidad ingresada
        }

        writeCartsToFile(carts);
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Carrito o producto no encontrado' });
    }
};
