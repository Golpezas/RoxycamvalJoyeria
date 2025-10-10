// Archivo: EMJoyas/frontend/pages/index.js

import Head from "next/head";
import axios from 'axios';
import HeroSection from '../components/Hero/HeroSection';
import ProductCard from '../components/Product/ProductCard';

// 1. Obtener datos del Backend antes de renderizar (Server-Side Rendering)
export async function getServerSideProps() {
  let noveltyProducts = [];
  let error = null;

  try {
    // Llama al endpoint de novedades del Backend
    const response = await axios.get('http://localhost:5000/api/v1/productos?novelty=true');
    noveltyProducts = response.data.products || [];
  } catch (err) {
    console.error("Error al obtener productos de novedad:", err.message);
    error = "No se pudo conectar al catálogo de joyería. Verifica el Backend (puerto 5000).";
  }

  return {
    props: {
      noveltyProducts,
      error,
    },
  };
}

const Home = ({ noveltyProducts, error }) => {

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-600 font-bold">{error}</div>;
  }

  return (
    <div className="min-h-screen"> 
      <Head>
        <title>Roxy camval - Joyería Exclusiva</title>
      </Head>
      
      <HeroSection />

      <div className="container mx-auto p-4 py-12">
        <h2 className="text-4xl font-serif font-bold mb-8 text-gray-800 border-b pb-2">
          ✨ Novedades y Colecciones
        </h2>

        {noveltyProducts.length === 0 ? (
          <p className="text-gray-600 text-center py-10">No hay productos marcados como novedad. Verifica el JSON del backend.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {noveltyProducts.map(product => (
              <ProductCard key={product.ID_SKU} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;