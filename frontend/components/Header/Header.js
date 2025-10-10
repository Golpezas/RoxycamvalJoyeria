// Archivo: EMJoyas/frontend/components/Header/Header.js
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext'; 

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const { totalItems } = useCart() || { totalItems: 0 }; // Usamos fallback por si el contexto falla

    const handleSearch = (e) => {
        if (e.type === 'submit') e.preventDefault(); 
        if (searchQuery.trim()) {
            router.push(`/busqueda?q=${searchQuery.trim()}`);
            setSearchQuery('');
        }
    };

    return (
        <header className="bg-white/95 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                
                {/* Logo */}
                <Link href="/" className="text-3xl font-serif font-extrabold text-pink-600 hover:text-pink-700 transition">
                    Roxycamval
                </Link>

                {/* Navegación Principal */}
                <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    <Link href="/categoria/anillos" className="hover:text-pink-600 transition">Anillos</Link>
                    <Link href="/categoria/collares" className="hover:text-pink-600 transition">Collares</Link>
                    <Link href="/categoria/pulseras" className="hover:text-pink-600 transition">Pulseras</Link>
                    <Link href="/ofertas" className="text-red-600 hover:text-red-700 transition font-bold">Ofertas</Link>
                </nav>

                {/* Búsqueda y Carrito */}
                <div className="flex items-center space-x-4">
                    
                    <form onSubmit={handleSearch} className="relative hidden lg:block">
                        <input
                            type="text"
                            placeholder="Buscar joyas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 w-64"
                        />
                        <button 
                            type="submit" 
                            aria-label="Buscar" 
                            className="absolute right-0 top-0 mt-2 mr-2 text-gray-600 hover:text-pink-600"
                        >
                            🔍
                        </button>
                    </form>

                    <button aria-label="Cuenta" className="text-gray-600 hover:text-pink-600">👤</button>
                    
                    {/* ENLACE AL CARRITO Y CONTADOR */}
                    <Link href="/carrito" aria-label="Carrito" className="text-gray-600 hover:text-pink-600 relative">
                        🛒
                        <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;