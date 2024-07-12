const express = require('express');
const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Importar y usar el router de productos
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// Importar y usar el router de carritos
const cartsRouter = require('./routes/carts');
app.use('/api/carts', cartsRouter);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

// Configurar el servidor para escuchar en el puerto 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

