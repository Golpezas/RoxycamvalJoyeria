// frontend/pages/producto/[sku].js
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:5000/api/v1/productos`);
  const data = await res.json();
  const product = data.products.find(p => p.ID_SKU === params.sku);

  if (!product) return { notFound: true };

  return { props: { product } };
}

export default function ProductoDetalle({ product }) {
  const { addToCart } = useCart();

  const precio = Number(product.Precio_MXN) || 0;
  const precioRegular = Number(product.Precio_Regular) || null;
  const esOferta = ['sí', 'si', 'true', '1'].includes(String(product.Es_Oferta || '').toLowerCase().trim());
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Link href="/" className="text-pink-300 hover:underline mb-8 inline-block text-lg">
        ← Volver al inicio
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Imagen */}
        <div className="relative h-96 md:h-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <Image
            src={product.URL_Imagen_Principal || '/images/placeholder.webp'}
            alt={product.Nombre_Producto}
            fill
            className="object-contain p-8"
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">{product.Nombre_Producto}</h1>
          <p className="text-xl mb-6 opacity-90">{product.Descripción_Corta}</p>
          {product.Descripción_Larga && <p className="mb-8 text-lg leading-relaxed">{product.Descripción_Larga}</p>}

          <div className="text-4xl font-bold mb-8">
            ${precio.toLocaleString('es-AR')} ARS
            {esOferta && precioRegular > precio && (
              <span className="block text-2xl text-gray-300 line-through">
                ${precioRegular.toLocaleString('es-AR')} ARS
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-2xl py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition"
          >
            Añadir al carrito
          </button>

          <div className="mt-6 text-lg">
            Stock disponible: <strong>{product.Existencias} unidades</strong>
          </div>
        </div>
      </div>
    </div>
  );
}