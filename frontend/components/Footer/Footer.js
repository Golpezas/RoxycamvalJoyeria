// Archivo: EMJoyas/frontend/components/Footer/Footer.js
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto p-8 border-t border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Marca */}
          <div>
            <h3 className="text-2xl font-serif font-extrabold text-pink-400 mb-4">Roxycamval</h3>
            <p className="text-sm text-gray-400">Joyería exclusiva, pasión y elegancia en cada pieza.</p>
            <div className="flex space-x-3 mt-4">
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-pink-400">📷</a>
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-pink-400">📘</a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Tienda</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categoria/anillos" className="text-gray-400 hover:text-white transition">Anillos</Link></li>
              <li><Link href="/categoria/collares" className="text-gray-400 hover:text-white transition">Collares</Link></li>
              <li><Link href="/categoria/pulseras" className="text-gray-400 hover:text-white transition">Pulseras</Link></li>
              <li><Link href="/ofertas" className="text-red-400 hover:text-white transition">Ofertas</Link></li>
            </ul>
          </div>

          {/* Columna 3: Información */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Ayuda</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">Sobre Nosotros</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition">Preguntas Frecuentes</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contacto</Link></li>
              <li><Link href="/politica-envio" className="text-gray-400 hover:text-white transition">Política de Envío</Link></li>
            </ul>
          </div>

          {/* Columna 4: Suscripción */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-3">Sé el primero en saber de nuestras novedades y ofertas.</p>
            <form>
              <input 
                type="email" 
                placeholder="Tu email" 
                className="w-full p-2 rounded text-gray-900 mb-2"
              />
              <button 
                type="submit" 
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded transition"
              >
                Suscribir
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Derechos de autor */}
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Roxycamval. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;