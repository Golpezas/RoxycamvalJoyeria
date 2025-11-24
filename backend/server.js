// backend/server.js → VERSIÓN FINAL CON CATEGORÍAS DINÁMICAS
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar catálogo
const { getCatalogData } = require('./services/sheetService');

// === RUTA PRINCIPAL: PRODUCTOS (con filtro opcional por categoría) ===
app.get('/api/v1/productos', async (req, res) => {
  try {
    const products = await getCatalogData(req.query);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching catalog data:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

// === NUEVA RUTA: LISTA DE CATEGORÍAS ÚNICAS ===
app.get('/api/v1/categorias', async (req, res) => {
  try {
    const data = await getCatalogData();
    const categorias = [...new Set(
      data.products
        .map(p => p.Categoría)
        .filter(cat => cat && cat.trim() !== '')
        .map(cat => cat.trim())
    )];
    res.json({ categorias });
  } catch (error) {
    res.json({ categorias: [] });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
  console.log(`Roxycamval → Catálogo y categorías dinámicas activados`);
});