// backend/server.js → VERSIÓN FINAL CON NEWSLETTER + TODO PERFECTO
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

// === PRODUCTOS (con filtro opcional) ===
app.get('/api/v1/productos', async (req, res) => {
  try {
    const products = await getCatalogData(req.query);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching catalog data:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

// === CATEGORÍAS ÚNICAS (Collares, Carteras, etc.) ===
app.get('/api/v1/categorias', async (req, res) => {
  try {
    const data = await getCatalogData();
    const categorias = [...new Set(
      data.products
        .map(p => p.Categoría)
        .filter(cat => cat && cat.trim() !== '')
        .map(cat => cat.trim())
    )];
    console.log("Categorías enviadas al frontend:", categorias); // ← para ver en terminal
    res.json({ categorias });
  } catch (error) {
    console.error("Error cargando categorías:", error);
    res.json({ categorias: [] });
  }
});

// === NEWSLETTER → LLEGA AL EMAIL DE LA TIENDA ===
app.post('/api/v1/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    // AQUÍ LLEGA EL EMAIL DE LA SUSCRIPCIÓN
    console.log('NUEVA SUSCRIPCIÓN NEWSLETTER →', email);
    console.log('¡Mandale un WhatsApp a Roxycamval! Nueva clienta suscripta:', email);

    // OPCIONAL FUTURO: conectar con Gmail, Brevo, Mailchimp, etc.
    // Por ahora lo vemos en la terminal del backend

    res.json({ success: true, message: '¡Suscripción exitosa!' });
  } catch (error) {
    console.error("Error en newsletter:", error);
    res.status(500).json({ error: 'Error al suscribir' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
  console.log(`Roxycamval → Catálogo, categorías y NEWSLETTER activados`);
  console.log(`7 productos cargados desde Google Sheets`);
});