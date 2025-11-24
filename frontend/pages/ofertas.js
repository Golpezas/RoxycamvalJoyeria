// frontend/pages/ofertas.js
import ProductCard from '../components/Product/ProductCard';
import Link from 'next/link';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:5000/api/v1/productos');
  const data = await res.json();

  const ofertas = data.products.filter(p => 
    ['sí','si','true','1'].includes(String(p.Es_Oferta || '').toLowerCase().trim())
  );

  return { props: { products: ofertas } };
}

export default function Ofertas({ products }) {
  return (
    <div className="container mx-auto px-6 py-16 min-h-screen">
      <Link href="/" className="inline-block mb-8 text-pink-400 hover:text-pink-300 font-bold text-lg">
        ← Volver al inicio
      </Link>

      <h1 className="text-7xl font-black text-center mb-4 text-red-500 drop-shadow-2xl">
        OFERTAS IMPERDIBLES
      </h1>
      <p className="text-3xl text-center mb-16 text-gray-300">
        Precios que no vas a creer
      </p>

      {products.length === 0 ? (
        <p className="text-center text-3xl text-gray-400 py-32">
          Pronto más ofertas
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <div key={p.ID_SKU} className="relative">
              <div className="absolute top-4 left-4 bg-red-600 text-white font-bold px-6 py-3 rounded-full z-10 shadow-2xl animate-pulse">
                OFERTA
              </div>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}