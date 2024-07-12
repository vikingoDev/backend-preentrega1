const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

// Leer productos desde el archivo JSON
const readProductsFromFile = () => {
    if (fs.existsSync(productsFilePath)) {
        const data = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
};

// Escribir productos en el archivo JSON
const writeProductsToFile = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
};

// Listar todos los productos
exports.getAllProducts = (req, res) => {
    const products = readProductsFromFile();
    res.json(products);
};

// Obtener un producto por ID
exports.getProductById = (req, res) => {
    const products = readProductsFromFile();
    const product = products.find(p => p.id === req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

// Agregar un nuevo producto
exports.addProduct = (req, res) => {
    const products = readProductsFromFile();
    const newProduct = {
        id: products.length + 1, // Generar un ID único
        ...req.body,
        status: req.body.status !== undefined ? req.body.status : true
    };
    products.push(newProduct);
    writeProductsToFile(products);
    res.status(201).json(newProduct);
};

// Actualizar un producto por ID
exports.updateProduct = (req, res) => {
    const products = readProductsFromFile();
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex !== -1) {
        const updatedProduct = {
            ...products[productIndex],
            ...req.body,
            id: products[productIndex].id // No actualizar el ID
        };
        products[productIndex] = updatedProduct;
        writeProductsToFile(products);
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

// Eliminar un producto por ID
exports.deleteProduct = (req, res) => {
    const products = readProductsFromFile();
    const newProducts = products.filter(p => p.id !== req.params.pid);
    if (newProducts.length !== products.length) {
        writeProductsToFile(newProducts);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

