const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar y usar la lógica del catálogo
const { getCatalogData } = require('./services/sheetService'); 

// Rutas de la API (Solo la ruta de productos por ahora)
app.get('/api/v1/productos', async (req, res) => {
    try {
        const products = await getCatalogData(req.query);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching catalog data:", error);
        res.status(500).json({ message: "Error interno del servidor al cargar el catálogo." });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
});