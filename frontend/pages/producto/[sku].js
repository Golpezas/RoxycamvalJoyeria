// frontend/pages/producto/[sku].js → VERSIÓN 100% FUNCIONAL + HERMOSA
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/productos`);
    const data = await res.json();
    const product = data.products.find(p => p.ID_SKU === params.sku?.toUpperCase());
    if (!product) return { notFound: true };
    return { props: { product } };
  } catch {
    return { notFound: true };
  }
}

export default function ProductoDetalle({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false); // Feedback visual

  const precio = Number(product.Precio_MXN) || 0;
  const precioRegular = Number(product.Precio_Regular) || null;
  const esOferta = ['sí','si','true','1'].includes(String(product.Es_Oferta || '').toLowerCase().trim());

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // desaparece en 2 segundos
  };

  return (
    <div className="container mx-auto px-6 py-16 min-h-screen">
      <Link href="/" className="inline-block mb-10 text-pink-400 hover:text-pink-300 font-bold text-lg">
        ← Volver al inicio
      </Link>

      <div className="grid md:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">

        {/* IMAGEN */}
        <div className="relative aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden">
          <Image
            src={product.URL_Imagen_Principal || '/images/placeholder.webp'}
            alt={product.Nombre_Producto}
            fill
            priority
            className="object-contain p-10 transition-transform duration-500 hover:scale-110"
            unoptimized
          />
        </div>

        {/* INFO + BOTÓN */}
        <div className="space-y-10">
          <div>
            <h1 className="text-6xl md:text-7xl font-black text-white drop-shadow-2xl leading-tight">
              {product.Nombre_Producto}
            </h1>
            <p className="text-2xl text-gray-300 mt-6">
              {product.Descripción_Corta}
            </p>
          </div>

          {product.Descripción_Larga && (
            <p className="text-xl text-gray-400 leading-relaxed">
              {product.Descripción_Larga}
            </p>
          )}

          {/* PRECIO */}
          <div className="space-y-4">
            <div className="text-7xl font-black text-pink-400">
              ${precio.toLocaleString('es-AR')}
            </div>
            {esOferta && precioRegular && precioRegular > precio && (
              <div className="text-4xl text-gray-500 line-through">
                ${precioRegular.toLocaleString('es-AR')}
              </div>
            )}
          </div>

          {/* BOTÓN CON FEEDBACK VISUAL */}
          <button
            onClick={handleAddToCart}
            className={`w-full relative overflow-hidden font-black text-4xl py-10 rounded-3xl shadow-2xl transform transition-all duration-500 ${
              added 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800'
            } text-white`}
          >
            {added ? 'AGREGADO AL CARRITO' : 'AÑADIR AL CARRITO'}
            {added && <span className="ml-4 text-5xl">Checkmark</span>}
          </button>

          <div className="text-2xl text-gray-300">
            Stock disponible: <span className="text-green-400 font-bold">{product.Existencias} unidades</span>
          </div>
        </div>
      </div>
    </div>
  );
}