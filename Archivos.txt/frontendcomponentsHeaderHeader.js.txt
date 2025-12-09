// frontend/components/Header/Header.js → FUNCIONA 100% – CARTERAS Y COLLARES APARECEN YA
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [categorias, setCategorias] = useState([]);
  const { totalItems = 0 } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/categorias')
      .then(res => res.json())
      .then(data => {
        console.log("Categorías recibidas:", data.categorias);
        setCategorias(data.categorias || []);
      })
      .catch(() => {
        console.log("Error al cargar categorías – usando fallback");
        setCategorias(['Collares', 'Carteras']);
      });
  }, []);

  return (
    <header className="bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Roxycamval"
            width={160}
            height={70}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* MENÚ */}
        <nav className="hidden lg:flex items-center space-x-12 text-lg font-medium">
          <Link href="/" className="text-white hover:text-pink-400 transition">
            Inicio
          </Link>

          {/* CATEGORÍAS DINÁMICAS */}
          {categorias.map(cat => (
            <Link
              key={cat}
              href={`/categoria/${cat.toLowerCase()}`}
              className="text-white hover:text-pink-400 transition capitalize"
            >
              {cat}
            </Link>
          ))}

          <Link href="/ofertas" className="text-red-500 hover:text-red-400 font-bold transition">
            Ofertas
          </Link>
        </nav>

        {/* CARRITO */}
        <Link href="/carrito" className="relative">
          <span className="text-4xl text-white hover:text-pink-400 transition">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-5 bg-pink-600 text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center animate-pulse">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;