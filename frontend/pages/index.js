// frontend/pages/index.js
import { useState, useEffect } from 'react';
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
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-100 to-white py-20 text-center">
        <h1 className="text-5xl font-bold text-pink-800 mb-4">Roxycamval</h1>
        <p className="text-2xl text-gray-700 mb-8">Joyería Brillante • Elegancia que Perdura</p>
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-10 rounded-full text-lg transition transform hover:scale-105">
          Explorar Colección
        </button>
      </section>

      {/* Productos */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          ✨ Novedades y Colecciones
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 py-20">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600 py-20">
            No hay productos disponibles en este momento.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.ID_SKU} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}