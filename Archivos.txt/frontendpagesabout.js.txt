// frontend/pages/sobre-nosotros.js
import Link from 'next/link';

export default function SobreNosotros() {
  return (
    <div className="container mx-auto px-6 py-16 min-h-screen">
      <Link href="/" className="inline-block mb-8 text-pink-400 hover:text-pink-300 font-bold text-lg">
        ← Volver al inicio
      </Link>

      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-black mb-8 text-pink-500">Roxycamval</h1>
        <p className="text-2xl mb-8 leading-relaxed">
          Somos una joyería artesanal con más de 10 años de pasión creando piezas únicas.
        </p>
        <p className="text-xl mb-12 text-gray-300">
          Cada collar, anillo y pulsera está hecho a mano con amor, plata 925 y piedras naturales.
        </p>
        <div className="bg-white/10 rounded-3xl p-12 backdrop-blur-sm">
          <p className="text-3xl font-bold text-pink-400">
            La elegancia no es destacar, es ser recordada.
          </p>
        </div>
      </div>
    </div>
  );
}