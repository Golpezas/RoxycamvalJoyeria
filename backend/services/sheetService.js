// Archivo: EMJoyas/backend/services/sheetService.js

const catalogData = [
    {
        "ID_SKU": "AR925-CUB-CIR-07",
        "Nombre_Producto": "Anillo Solitario Clásico",
        "Categoría": "Anillos",
        "Subcategoría": "Compromiso",
        "Material": "Plata Esterlina 925",
        "Piedra_Principal": "Circonia Cúbica",
        "Talla/Medida": "Talla 7",
        "Peso_Gramos": 3.25,
        "Precio_MXN": 1899,
        "Existencias": 25,
        "URL_Imagen_Principal": "/images/anillo-clasico.webp",
        "URL_Imagen_Secundaria_1": "url/p1-sec.webp",
        "Descripción_Corta": "Anillo elegante.",
        "Descripción_Larga": "Anillo Solitario Clásico con circonia cúbica en plata 925. Ideal para compromiso o regalo especial.",
        "Etiquetas_Busqueda": "solitario, boda, plata",
        "Producto_Activo": true,
        "Es_Novedad": true,
        "Es_Oferta": false
    },
    {
        "ID_SKU": "COL14K-DIA-001",
        "Nombre_Producto": "Collar Solitario de Oro",
        "Categoría": "Collares",
        "Subcategoría": "Cadenas",
        "Material": "Oro Amarillo 14k",
        "Piedra_Principal": "Diamante Natural",
        "Talla/Medida": "45 cm",
        "Peso_Gramos": 5.8,
        "Precio_MXN": 15999,
        "Existencias": 5,
        "URL_Imagen_Principal": "/images/collar-oro.webp",
        "URL_Imagen_Secundaria_1": "url/p2-sec.webp",
        "Descripción_Corta": "Lujo y exclusividad.",
        "Descripción_Larga": "Collar con diamante natural en cadena de oro 14K. Lujo y exclusividad, garantía 1 año.",
        "Etiquetas_Busqueda": "lujo, diamante, regalo, oro",
        "Producto_Activo": true,
        "Es_Novedad": false,
        "Es_Oferta": true
    },
    {
        "ID_SKU": "PUL925-CAD-002",
        "Nombre_Producto": "Pulsera Cadena Eslabones",
        "Categoría": "Pulseras",
        "Subcategoría": "Cadenas",
        "Material": "Plata Esterlina 925",
        "Piedra_Principal": "Ninguna",
        "Talla/Medida": "18 cm",
        "Peso_Gramos": 12.1,
        "Precio_MXN": 2499,
        "Existencias": 40,
        "URL_Imagen_Principal": "/images/pulsera-eslabones.webp",
        "URL_Imagen_Secundaria_1": "url/p3-sec.webp",
        "Descripción_Corta": "Cadena gruesa de estilo moderno.",
        "Descripción_Larga": "Pulsera de eslabones gruesos en Plata 925. Diseño robusto y moderno, perfecto para el uso diario.",
        "Etiquetas_Busqueda": "cadena, eslabones, plata, moda",
        "Producto_Activo": true,
        "Es_Novedad": true,
        "Es_Oferta": false
    }
];

const filterProducts = (query) => {
    let results = catalogData;

    // 1. Filtrar por búsqueda global (parámetro 'search' o 'q')
    const searchQuery = query.search || query.q;
    if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        results = results.filter(p => 
            p.Nombre_Producto.toLowerCase().includes(lowerCaseQuery) ||
            p.Descripción_Corta.toLowerCase().includes(lowerCaseQuery) ||
            p.Etiquetas_Busqueda.toLowerCase().includes(lowerCaseQuery)
        );
    }

    // 2. Filtrar por categoría (parámetro 'cat')
    const category = query.cat;
    if (category) {
        const lowerCaseCategory = category.toLowerCase();
        results = results.filter(p => p.Categoría.toLowerCase() === lowerCaseCategory);
    }

    return results;
};


// Función principal para obtener datos (simulando una API asíncrona)
const getCatalogData = (query = {}) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const products = filterProducts(query);
            resolve({
                count: products.length,
                products: products
            });
        }, 100); // Pequeño retraso para simular red
    });
};

// Función para obtener un solo producto por SKU
const getProductBySku = (sku) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = catalogData.find(p => p.ID_SKU === sku);
            if (product) {
                resolve(product);
            } else {
                reject({ status: 404, message: "Producto no encontrado" });
            }
        }, 100);
    });
};

module.exports = {
    getCatalogData,
    getProductBySku
};