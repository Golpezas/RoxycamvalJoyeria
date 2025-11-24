// frontend/components/Product/ProductCard.js
// VERSIÓN FINAL – SIN ERRORES DE HOOKS – LISTA PARA PRODUCCIÓN

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  const [imgSrc, setImgSrc] = useState('/images/placeholder.webp');

  // TODOS LOS HOOKS SIEMPRE AL PRINCIPIO (regla sagrada de React)
  useEffect(() => {
    // Si no hay producto → usamos placeholder
    if (!product) {
      setImgSrc('/images/placeholder.webp');
      return;
    }

    // 1. Si el cliente ya puso una URL real en la hoja → la usamos
    const urlExterna = product.URL_Imagen_Principal?.trim();
    if (urlExterna) {
      setImgSrc(urlExterna);
      return;
    }

    // 2. Si no hay URL externa → buscamos imagen local con el SKU
    const sku = product.ID_SKU || 'placeholder';
    const imagenLocal = `/images/productos/${sku}.jpg`;

    const img = new window.Image();
    img.src = imagenLocal;
    img.onload = () => setImgSrc(imagenLocal);
    img.onerror = () => setImgSrc('/images/placeholder.webp');

  }, [product]); // ← ahora sí incluye 'product' → se elimina el warning

  // VALIDACIÓN TEMPRANA DESPUÉS de los hooks
  if (!product || !product.ID_SKU) {
    return null;
  }

  const isOffer = ['sí', 'si', 'true', '1'].includes(
    product.Es_Oferta?.toString().toLowerCase()
  );

  const price = Number(product.Precio_MXN) || 0;
  const oldPrice = Number(product.Precio_Regular) || price;

  const formatPrice = (p) => `$${p.toLocaleString('es-AR')} MXN`;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <Link href={`/producto/${product.ID_SKU}`} className="block">

        <div className="card-image-container">
          <Image
            src={imgSrc}
            alt={product.Nombre_Producto}
            fill
            priority          // ← solo en la home si querés
            className="object-contain p-6 ..."
            unoptimized
          />
          {isOffer && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full z-10 shadow-2xl">
              OFERTA
            </span>
          )}
        </div>

        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
            {product.Nombre_Producto}
          </h3>
          {product.Piedra_Principal && (
            <p className="text-sm text-gray-500 mb-2">{product.Piedra_Principal}</p>
          )}

          <div className="flex justify-center items-center gap-3 mt-3">
            <span className={`text-xl font-bold ${isOffer ? 'text-red-600' : 'text-pink-600'}`}>
              {formatPrice(price)}
            </span>
            {isOffer && oldPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>
        </div>

      </Link>

      <div className="px-4 pb-4">
        <Link href={`/producto/${product.ID_SKU}`}>
          <button
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              product.Existencias > 0
                ? 'bg-pink-600 text-white hover:bg-pink-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={product.Existencias <= 0}
          >
            {product.Existencias > 0 ? 'Ver Detalles' : 'Sin Stock'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;