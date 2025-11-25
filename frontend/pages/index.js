// frontend/pages/index.js → TÍTULO + FAVICON + SEO PERFECTO
import { useState, useEffect } from 'react';
import Head from 'next/head'; // ← IMPORTANTE: agregamos Head
import ProductCard from '../components/Product/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/productos')
      .then(res => res.json())
      .then(data => {
        const validProducts = (data.products || []).filter(p => p && p.ID_SKU);
        setProducts(validProducts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {/* TÍTULO, DESCRIPCIÓN Y METADATOS (aparece en la pestaña y Google) */}
      <Head>
        <title>Roxycamval Joyería • Exclusiva y Elegante</title>
        <meta
          name="description"
          content="Joyería exclusiva con pasión y elegancia. Collares, aros y accesorios únicos. Envíos a todo Argentina."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Roxycamval Joyería" />
        <meta
          property="og:description"
          content="Joyería exclusiva con amor desde Argentina"
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://roxycamval.com.ar" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-pink-100 to-white py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-pink-800 mb-6 drop-shadow-lg">
            Roxycamval
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-10 font-medium">
            Joyería Brillante • Elegancia que Perdura
          </p>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-5 px-12 rounded-full text-xl transition transform hover:scale-110 shadow-xl">
            Explorar Colección
          </button>
        </section>

        {/* Productos */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-800">
            Novedades y Colecciones
          </h2>

          {loading ? (
            <p className="text-center text-gray-600 py-20 text-2xl">Cargando productos...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600 py-20 text-2xl">
              No hay productos disponibles en este momento.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map(product => (
                <ProductCard key={product.ID_SKU} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}