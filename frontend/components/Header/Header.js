// frontend/components/Header/Header.js → CONTADOR SUBE + SIN ERRORES
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categorias, setCategorias] = useState([]);
  const router = useRouter();
  const { totalItems = 0 } = useCart(); // ← Ahora sí lee el total real

  // Cargar categorías dinámicamente
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/categorias')
      .then(res => res.json())
      .then(data => {
        setCategorias(data.categorias || []); // ← CORREGIDO: era setCategorias934
      })
      .catch(err => {
        console.error("Error cargando categorías:", err);
        setCategorias(['Collares']); // fallback
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/busqueda?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-4xl font-black text-pink-500 hover:text-pink-400 transition">
          Roxycamval
        </Link>

        {/* Navegación dinámica */}
        <nav className="hidden lg:flex items-center space-x-10 text-lg font-medium">
          <Link href="/" className="text-white hover:text-pink-400 transition">
            Inicio
          </Link>

          {/* CATEGORÍAS DINÁMICAS */}
          {categorias.map(cat => (
            <Link
              key={cat}
              href={`/categoria/${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-white hover:text-pink-400 transition capitalize"
            >
              {cat}
            </Link>
          ))}

          <Link href="/ofertas" className="text-red-500 hover:text-red-400 font-bold transition">
            Ofertas
          </Link>
        </nav>

        {/* Búsqueda + Carrito con contador visible */}
        <div className="flex items-center space-x-6">

          {/* Buscador */}
          <form onSubmit={handleSearch} className="hidden xl:block">
            <input
              type="text"
              placeholder="Buscar joyas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 w-64"
            />
          </form>

          {/* Ícono del carrito con contador */}
          <Link href="/carrito" className="relative">
            <span className="text-4xl text-white hover:text-pink-400 transition">Carrito</span>
            
            {/* CONTADOR QUE SUBE */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-pink-600 text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center animate-pulse shadow-lg">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;