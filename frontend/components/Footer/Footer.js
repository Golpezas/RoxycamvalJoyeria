// frontend/components/Footer/Footer.js → VERSIÓN FINAL DEFINITIVA (como vos querés)
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black/90 text-white mt-20 border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Columna 1: Marca + Instagram + WhatsApp (solo botón grande) */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-black text-pink-500 mb-4">Roxycamval</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Joyería exclusiva, pasión y elegancia en cada pieza.<br />
                Seguinos en Instagram → <span className="text-pink-400 font-bold">@roxycamval</span>
              </p>
            </div>

            {/* Instagram (queda igual, perfecto como estaba) */}
            <div className="flex items-center">
              <a 
                href="https://www.instagram.com/roxycamval/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-3xl hover:text-pink-400 transition transform hover:scale-110"
              >
                Instagram
              </a>
            </div>

            {/* SOLO UN BOTÓN DE WHATSAPP (grande, verde y hermoso) */}
            <a 
              href="https://wa.me/5491131991996?text=¡Hola%20Roxycamval!%20Vi%20tu%20tienda%20y%20quiero%20consultar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-lg py-4 rounded-full text-center shadow-xl transform hover:scale-105 transition"
            >
              CHATEAR POR WHATSAPP
            </a>
          </div>

          {/* Columna 2: Tienda */}
          <div>
            <h4 className="text-xl font-bold mb-5 text-pink-400">Tienda</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/" className="hover:text-white transition">Inicio</Link></li>
              <li><Link href="/categoria/collares" className="hover:text-white transition capitalize">Collares</Link></li>
              <li><Link href="/ofertas" className="text-red-500 hover:text-red-300 font-bold transition">Ofertas</Link></li>
            </ul>
          </div>

          {/* Columna 3: Ayuda */}
          <div>
            <h4 className="text-xl font-bold mb-5 text-pink-400">Ayuda</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/about" className="hover:text-white transition">Sobre Nosotros</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">Preguntas Frecuentes</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition">Contacto</Link></li>
              <li><Link href="/politica-envio" className="hover:text-white transition">Política de Envío</Link></li>
            </ul>
          </div>

          {/* Columna 4: Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-5 text-pink-400">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Sé el primero en saber de nuestras novedades y ofertas exclusivas.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-500 focus:outline-none focus:border-pink-500 transition"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 font-bold py-3 rounded-lg transition transform hover:scale-105"
              >
                Suscribir
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/95 py-5 border-t border-white/10">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} <span className="text-pink-400 font-bold">Roxycamval</span> • Joyería con amor desde Argentina
        </div>
      </div>
    </footer>
  );
};

export default Footer;