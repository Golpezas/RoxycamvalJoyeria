// Archivo: EMJoyas/frontend/components/Product/ProductCard.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => {
    const defaultSrc = '/images/image-placeholder.webp';
    const [imgSrc, setImgSrc] = useState(defaultSrc);

    // On mount, check if the product image URL exists (avoid 404s from bad URLs).
    useEffect(() => {
        let cancelled = false;
        const url = product?.URL_Imagen_Principal;
        if (!url) {
            setImgSrc(defaultSrc);
            return;
        }

        // Try a lightweight HEAD request; if that fails, keep placeholder.
        (async () => {
            try {
                const res = await fetch(url, { method: 'HEAD' });
                if (!cancelled) {
                    if (res.ok) setImgSrc(url);
                    else setImgSrc(defaultSrc);
                }
            } catch (err) {
                if (!cancelled) setImgSrc(defaultSrc);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [product?.URL_Imagen_Principal]);

    if (!product || !product.ID_SKU) return null;

  const isOffer = product.Es_Oferta;
  const price = product.Precio_MXN;
  const oldPrice = product.Precio_Regular;

  const formatPrice = (p) => `$${p.toFixed(2)} MXN`;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <Link href={`/producto/${product.ID_SKU}`} passHref>
        
        {/* Imagen del Producto */}
    <div className="relative w-full h-64 min-h-[160px] bg-gray-50 flex items-center justify-center overflow-hidden"> 
            <Image
                src={imgSrc}
                alt={product.Nombre_Producto}
                fill
                style={{ objectFit: 'contain' }}
                className="transition-transform duration-500 group-hover:scale-105"
                unoptimized={true}
                onError={() => {
                    if (imgSrc !== defaultSrc) setImgSrc(defaultSrc);
                }}
            />
            {isOffer && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    OFERTA
                </span>
            )}
        </div>

        {/* Detalles */}
        <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                {product.Nombre_Producto}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{product.Piedra_Principal}</p>
            
            <div className="flex justify-center items-center space-x-3">
                <p className={`text-xl font-bold ${isOffer ? 'text-red-600' : 'text-gray-900'}`}>
                    {formatPrice(price)}
                </p>
                {isOffer && oldPrice && (
                    <p className="text-sm text-gray-500 line-through">
                        {formatPrice(oldPrice)}
                    </p>
                )}
            </div>
            
        </div>
      </Link>
      
      {/* Botón de Añadir (Opcional, usaremos el de la página de detalle) */}
      <div className="p-4 pt-0">
         <button 
            // Esto es solo un placeholder visual. El real está en [sku].js
            disabled={product.Existencias <= 0}
            className={`w-full py-2 text-sm font-semibold rounded-lg transition ${
                product.Existencias > 0 
                    ? 'bg-pink-100 text-pink-700 hover:bg-pink-600 hover:text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
        >
            Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default ProductCard;