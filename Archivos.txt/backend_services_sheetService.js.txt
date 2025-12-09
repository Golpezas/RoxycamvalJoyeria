// backend/services/sheetService.js
const { google } = require('googleapis');
require('dotenv').config();

const sheets = google.sheets('v4');

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

let catalogData = [];

const loadCatalog = async () => {
  try {
    const client = await auth.getClient();
    const response = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Productos!A:ZZ', // lee todas las columnas
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log('Hoja vacía o sin acceso');
      return;
    }

    const headers = rows[0];
    catalogData = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h.trim()] = row[i] || '';
      });
      // Conversiones necesarias
      obj.Precio_MXN = parseFloat(obj.Precio_MXN) || 0;
      obj.Precio_Regular = parseFloat(obj.Precio_Regular) || obj.Precio_MXN;
      obj.Existencias = parseInt(obj.Existencias) || 0;
      obj.Es_Oferta = ['sí', 'si', '1', 'true'].includes(obj.Es_Oferta?.toLowerCase());
      obj.Es_Novedad = ['sí', 'si', '1', 'true'].includes(obj.Es_Novedad?.toLowerCase());
      return obj;
    });

    console.log(`Roxycamval → Catálogo cargado: ${catalogData.length} productos cargados desde Google Sheets`);
  } catch (error) {
    console.error('Error conectando con Google Sheets:', error.message);
  }
};

// Carga inicial
loadCatalog();

// Recarga cada 5 minutos (el cliente puede editar la hoja y se actualiza sola)
setInterval(loadCatalog, 5 * 60 * 1000);

const filterProducts = (query) => {
  let results = [...catalogData];

  if (query.q || query.search) {
    const term = (query.q || query.search).toLowerCase();
    results = results.filter(p =>
      p.Nombre_Producto?.toLowerCase().includes(term) ||
      p.Descripción_Corta?.toLowerCase().includes(term) ||
      p.Etiquetas_Busqueda?.toLowerCase().includes(term)
    );
  }

  if (query.cat) {
    results = results.filter(p => p.Categoría?.toLowerCase() === query.cat.toLowerCase());
  }

  if (query.novelty === 'true') {
    results = results.filter(p => p.Es_Novedad);
  }

  return results;
};

module.exports = {
  getCatalogData: async (query = {}) => ({
    count: filterProducts(query).length,
    products: filterProducts(query)
  }),
  getProductBySku: async (sku) => {
    const product = catalogData.find(p => p.ID_SKU === sku);
    if (!product) throw { status: 404, message: 'Producto no encontrado' };
    return product;
  },
  loadCatalog
};