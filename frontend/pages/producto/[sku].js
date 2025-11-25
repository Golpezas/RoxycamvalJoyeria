// frontend/pages/producto/[sku].js → VERSIÓN FINAL ÉPICA + WHATSAPP + SEO + SIN ERRORES
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/productos`);
    const data = await res.json();
    const product = data.products.find(p => p.ID_SKU === params.sku?.toUpperCase());
    if (!product) return { notFound: true };
    return { props: { product } };
  } catch (error) {
    console.error("Error cargando producto:", error);
    return { notFound: true };
  }
}

export default function ProductoDetalle({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const precio = Number(product.Precio_MXN) || 0;
  const precioRegular = Number(product.Precio_Regular) || null;
  const esOferta = ['sí', 'si', 'true', '1'].includes(String(product.Es_Oferta || '').toLowerCase().trim());

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola Roxycamval! Quiero la *${product.Nombre_Producto}* (Código: ${product.ID_SKU})\nPrecio: $${precio.toLocaleString('es-AR')}\n¡Gracias!`
  );

  return (
    <>
      <Head>
        <title>{product.Nombre_Producto} • Roxycamval Joyería</title>
        <meta name="description" content={product.Descripción_Corta || "Joya exclusiva hecha con amor"} />
        <meta property="og:title" content={product.Nombre_Producto} />
        <meta property="og:image" content={product.URL_Imagen_Principal || "/images/logo.png"} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-6 max-w-7xl">

          <Link href="/" className="inline-block mb-10 text-pink-400 hover:text-pink-300 font-bold text-lg">
            ← Volver al inicio
          </Link>

          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* IMAGEN */}
            <div className="relative aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden">
              {product.URL_Imagen_Principal ? (
                <Image
                  src={product.URL_Imagen_Principal}
                  alt={product.Nombre_Producto}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-8 md:p-12 transition-transform duration-700 hover:scale-110"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl text-gray-500">Sin imagen</span>
                </div>
              )}
            </div>

            {/* INFO + BOTONES */}
            <div className="space-y-10 flex flex-col justify-center">

              <div>
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-2xl leading-tight">
                  {product.Nombre_Producto}
                </h1>
                <p className="text-2xl text-gray-300 mt-6 font-medium">
                  {product.Descripción_Corta || product.Categoría}
                </p>
              </div>

              {product.Descripción_Larga && (
                <p className="text-xl text-gray-400 leading-relaxed bg-black/50 p-6 rounded-2xl">
                  {product.Descripción_Larga}
                </p>
              )}

              {/* PRECIO */}
              <div className="space-y-4">
                <div className="text-7xl font-black text-pink-400">
                  ${precio.toLocaleString('es-AR')}
                </div>
                {esOferta && precioRegular && precioRegular > precio && (
                  <div className="text-4xl text-gray-500 line-through opacity-70">
                    ${precioRegular.toLocaleString('es-AR')}
                  </div>
                )}
              </div>

              {/* BOTONES ÉPICOS */}
              <div className="space-y-6">
                <button
                  onClick={handleAddToCart}
                  className={`w-full relative overflow-hidden font-black text-4xl py-10 rounded-3xl shadow-2xl transform transition-all duration-500 ${
                    added 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800'
                  } text-white`}
                >
                  {added ? 'AGREGADO AL CARRITO' : 'AÑADIR AL CARRITO'}
                  {added && <span className="ml-6 text-5xl">Checkmark</span>}
                </button>

                <a
                  href={`https://wa.me/5491131991996?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-black text-4xl py-10 rounded-3xl shadow-2xl transform hover:scale-105 transition"
                >
                  COMPRAR POR WHATSAPP
                </a>
              </div>

              <div className="text-xl text-gray-400 space-y-2">
                <p>Stock disponible: <span className="text-green-400 font-bold">{product.Existencias} unidades</span></p>
                <p className="text-sm">Envíos a todo Argentina • Pagos por transferencia o Mercado Pago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}