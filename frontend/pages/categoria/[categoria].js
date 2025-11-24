// frontend/pages/categoria/[categoria].js
import ProductCard from '../../components/Product/ProductCard';
import Link from 'next/link';

export async function getServerSideProps({ params }) {
  const cat = params.categoria.toLowerCase().replace(/-/g, ' ');
  const res = await fetch(`http://localhost:5000/api/v1/productos`);
  const data = await res.json();

  const productos = data.products.filter(p =>
    p.Categoría?.toLowerCase().includes(cat)
  );

  const titulo = productos.length > 0
    ? productos[0].Categoría
    : cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');

  return { props: { products: productos, titulo } };
}

export default function Categoria({ products, titulo }) {
  return (
    <div className="container mx-auto px-6 py-16 min-h-screen">
      <Link href="/" className="inline-block mb-8 text-pink-400 hover:text-pink-300 font-bold text-lg">
        ← Volver al inicio
      </Link>

      <h1 className="text-6xl font-black text-center mb-16 text-white drop-shadow-2xl">
        {titulo}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-3xl text-gray-400 py-32">
          Pronto más productos en esta categoría
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <ProductCard key={p.ID_SKU} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}