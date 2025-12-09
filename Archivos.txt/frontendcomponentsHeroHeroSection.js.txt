import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative h-[60vh] w-full bg-white flex items-center justify-center overflow-hidden">
        {/* Contenedor de la imagen con altura y ancho explícitos */}
        <div className="absolute inset-0 w-full h-full z-0">
            <Image
                src="/images/hero-background.webp"
                alt="Joyería Brillante"
                fill
                style={{ objectFit: 'cover', opacity: 0.5 }}
                priority
                unoptimized={true}
                onError={() => console.error('Error cargando la imagen de fondo')}
            />
        </div>

      <div className="relative z-10 text-center p-8 bg-white/70 rounded-xl shadow-2xl">
        <h1 className="text-6xl md:text-7xl font-serif font-extrabold text-gray-800 mb-4 leading-tight">
          Elegancia que Perdura
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-lg mx-auto">
          Descubre nuestra exclusiva colección de joyas, diseñadas para brillar en cada momento.
        </p>
        <Link 
          href="/categoria/collares" 
          className="inline-block px-8 py-3 bg-pink-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-105"
        >
          Explorar Colección
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;